/**
 * JavaScript AST instrumentation via Babel — Section 7.5
 * Transforms user code to call __trace.* at key execution points.
 */
import * as babel from '@babel/core';
import type { NodePath, PluginObj } from '@babel/core';
import * as t from '@babel/types';
import generate from '@babel/generator';

// ── Helper: build {arg1: arg1, arg2: arg2} object from param list ────────────

function buildParamsObject(params: t.FunctionDeclaration['params']): t.ObjectExpression {
  const props: t.ObjectProperty[] = [];
  for (const param of params) {
    if (t.isIdentifier(param)) {
      props.push(
        t.objectProperty(t.identifier(param.name), t.identifier(param.name), false, true),
      );
    }
  }
  return t.objectExpression(props);
}

// ── Generate source text for a node (for condition expressions) ──────────────

function sourceText(node: t.Node): string {
  try {
    return generate(node).code;
  } catch {
    return '[expression]';
  }
}

// ── __trace.method(...) call builder ─────────────────────────────────────────

function traceCall(method: string, args: t.Expression[]): t.ExpressionStatement {
  return t.expressionStatement(
    t.callExpression(
      t.memberExpression(t.identifier('__trace'), t.identifier(method)),
      args,
    ),
  );
}

// ── Babel plugin ─────────────────────────────────────────────────────────────

function flowMindPlugin(): PluginObj {
  return {
    visitor: {
      // Function declarations: inject __trace.call at entry
      FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
        const fnName = path.node.id?.name ?? '<anonymous>';
        const callStmt = traceCall('call', [
          t.stringLiteral(fnName),
          buildParamsObject(path.node.params),
        ]);
        path.node.body.body.unshift(callStmt);
      },

      // Function expressions and arrow functions with block body
      FunctionExpression(path: NodePath<t.FunctionExpression>) {
        if (!t.isBlockStatement(path.node.body)) return;
        const parent = path.parent;
        const fnName =
          t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)
            ? parent.id.name
            : '<anonymous>';
        const callStmt = traceCall('call', [
          t.stringLiteral(fnName),
          buildParamsObject(path.node.params),
        ]);
        (path.node.body as t.BlockStatement).body.unshift(callStmt);
      },

      ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
        if (!t.isBlockStatement(path.node.body)) return;
        const parent = path.parent;
        const fnName =
          t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)
            ? parent.id.name
            : '<anonymous>';
        const callStmt = traceCall('call', [
          t.stringLiteral(fnName),
          buildParamsObject(path.node.params),
        ]);
        (path.node.body as t.BlockStatement).body.unshift(callStmt);
      },

      // Variable declarations: inject __trace.assign after each declarator
      VariableDeclaration(path: NodePath<t.VariableDeclaration>) {
        const stmts: t.Statement[] = [path.node];
        for (const decl of path.node.declarations) {
          if (t.isIdentifier(decl.id) && decl.init) {
            stmts.push(
              traceCall('assign', [
                t.stringLiteral(decl.id.name),
                t.nullLiteral(),
                t.identifier(decl.id.name),
              ]),
            );
          }
        }
        if (stmts.length > 1) {
          path.replaceWithMultiple(stmts);
        }
      },

      // Assignment expressions: __trace.assign(name, old, new)
      AssignmentExpression(path: NodePath<t.AssignmentExpression>) {
        if (!t.isIdentifier(path.node.left)) return;
        const name = path.node.left.name;
        // Don't instrument assignments that are already __trace calls
        if (
          t.isCallExpression(path.parent) &&
          t.isMemberExpression((path.parent as t.CallExpression).callee) &&
          t.isIdentifier(
            ((path.parent as t.CallExpression).callee as t.MemberExpression).object,
          ) &&
          (((path.parent as t.CallExpression).callee as t.MemberExpression).object as t.Identifier)
            .name === '__trace'
        ) {
          return;
        }
        const stmt = traceCall('assign', [
          t.stringLiteral(name),
          t.identifier(name),
          path.node.right,
        ]);
        const parentPath = path.parentPath;
        if (parentPath && t.isExpressionStatement(parentPath.node)) {
          parentPath.insertAfter(stmt);
        }
      },

      // If statements: inject __trace.condition before the test
      IfStatement(path: NodePath<t.IfStatement>) {
        const expr = sourceText(path.node.test);
        path.insertBefore(
          traceCall('condition', [t.stringLiteral(expr), path.node.test]),
        );
      },

      // While loops: inject __trace.loop at top of body
      WhileStatement(path: NodePath<t.WhileStatement>) {
        const line = path.node.loc?.start.line ?? 0;
        const loopStmt = traceCall('loop', [t.numericLiteral(line), t.objectExpression([])]);
        if (t.isBlockStatement(path.node.body)) {
          (path.node.body as t.BlockStatement).body.unshift(loopStmt);
        }
      },

      // For loops: inject __trace.loop at top of body
      ForStatement(path: NodePath<t.ForStatement>) {
        const line = path.node.loc?.start.line ?? 0;
        const loopStmt = traceCall('loop', [t.numericLiteral(line), t.objectExpression([])]);
        if (t.isBlockStatement(path.node.body)) {
          (path.node.body as t.BlockStatement).body.unshift(loopStmt);
        }
      },

      // Return statements: inject __trace.return before
      ReturnStatement(path: NodePath<t.ReturnStatement>) {
        if (path.node.argument) {
          path.insertBefore(
            traceCall('return', [path.node.argument]),
          );
        }
      },
    },
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

const TRACE_REQUIRE = `const __trace = require('/opt/flowmind/trace-collector');\n`;

export function instrumentJavaScript(code: string): { code: string; error?: string } {
  try {
    const result = babel.transformSync(code, {
      plugins: [flowMindPlugin],
      parserOpts: { allowReturnOutsideFunction: true },
      generatorOpts: { retainLines: true, compact: false },
      configFile: false,
      babelrc: false,
    });

    if (!result?.code) {
      return { code, error: 'Babel transform produced no output' };
    }

    return { code: TRACE_REQUIRE + result.code };
  } catch (err) {
    return { code, error: (err as Error).message };
  }
}
