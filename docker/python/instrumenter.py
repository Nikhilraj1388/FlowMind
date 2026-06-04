"""
FlowMind Python AST instrumenter — Section 7.6
Run as: python instrumenter.py <input_file> <output_file>

Transforms user Python code to inject trace.* calls at:
- Function entries  → trace.call()
- Variable assigns  → trace.assign()
- If conditions     → trace.condition()
- While/For loops   → trace.loop()
- Return statements → trace.return_()
"""
import ast
import sys
import copy

HEADER = """import sys as _sys
_sys.path.insert(0, '/opt/flowmind')
from trace_collector import trace

"""


class FlowMindTransformer(ast.NodeTransformer):
    """Walks the AST and injects trace calls per Section 7.6."""

    def _make_trace_call(self, method, *args):
        return ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr=method,
                    ctx=ast.Load(),
                ),
                args=list(args),
                keywords=[],
            )
        )

    def _make_condition_call(self, test_node):
        """Build trace.condition(expr_str, test_value)"""
        expr_str = ast.unparse(test_node)
        return ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='condition',
                    ctx=ast.Load(),
                ),
                args=[
                    ast.Constant(value=expr_str),
                    copy.deepcopy(test_node),
                ],
                keywords=[],
            )
        )

    def _make_call_call(self, func_name, args_node):
        """Build trace.call(name, **kwargs)"""
        return ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='call',
                    ctx=ast.Load(),
                ),
                args=[ast.Constant(value=func_name)],
                keywords=[
                    ast.keyword(arg=arg.arg, value=ast.Name(id=arg.arg, ctx=ast.Load()))
                    for arg in args_node
                    if isinstance(arg, ast.arg) and arg.arg != 'self'
                ],
            )
        )

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        call_stmt = self._make_call_call(node.name, node.args.args)
        ast.copy_location(call_stmt, node)
        node.body.insert(0, call_stmt)
        return node

    visit_AsyncFunctionDef = visit_FunctionDef

    def visit_Assign(self, node):
        self.generic_visit(node)
        stmts = [node]
        for target in node.targets:
            if isinstance(target, ast.Name):
                assign_stmt = ast.Expr(
                    value=ast.Call(
                        func=ast.Attribute(
                            value=ast.Name(id='trace', ctx=ast.Load()),
                            attr='assign',
                            ctx=ast.Load(),
                        ),
                        args=[
                            ast.Constant(value=target.id),
                            ast.Constant(value=None),
                            ast.Name(id=target.id, ctx=ast.Load()),
                        ],
                        keywords=[],
                    )
                )
                ast.copy_location(assign_stmt, node)
                stmts.append(assign_stmt)
        return stmts

    def visit_AugAssign(self, node):
        self.generic_visit(node)
        if not isinstance(node.target, ast.Name):
            return node
        name = node.target.id
        assign_stmt = ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='assign',
                    ctx=ast.Load(),
                ),
                args=[
                    ast.Constant(value=name),
                    ast.Constant(value=None),
                    ast.Name(id=name, ctx=ast.Load()),
                ],
                keywords=[],
            )
        )
        ast.copy_location(assign_stmt, node)
        return [node, assign_stmt]

    def visit_If(self, node):
        self.generic_visit(node)
        cond_stmt = self._make_condition_call(node.test)
        ast.copy_location(cond_stmt, node)
        return [cond_stmt, node]

    def visit_While(self, node):
        self.generic_visit(node)
        loop_stmt = ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='loop',
                    ctx=ast.Load(),
                ),
                args=[ast.Constant(value=node.lineno)],
                keywords=[],
            )
        )
        ast.copy_location(loop_stmt, node)
        node.body.insert(0, loop_stmt)
        return node

    def visit_For(self, node):
        self.generic_visit(node)
        loop_stmt = ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='loop',
                    ctx=ast.Load(),
                ),
                args=[ast.Constant(value=node.lineno)],
                keywords=[],
            )
        )
        ast.copy_location(loop_stmt, node)
        node.body.insert(0, loop_stmt)
        return node

    def visit_Return(self, node):
        self.generic_visit(node)
        if node.value is None:
            return node
        ret_stmt = ast.Expr(
            value=ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id='trace', ctx=ast.Load()),
                    attr='return_',
                    ctx=ast.Load(),
                ),
                args=[copy.deepcopy(node.value)],
                keywords=[],
            )
        )
        ast.copy_location(ret_stmt, node)
        return [ret_stmt, node]


def instrument(source_code):
    tree = ast.parse(source_code)
    transformer = FlowMindTransformer()
    new_tree = transformer.visit(tree)
    ast.fix_missing_locations(new_tree)
    instrumented = ast.unparse(new_tree)
    return HEADER + instrumented + "\n"


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python instrumenter.py <input.py> <output.py>", file=sys.stderr)
        sys.exit(1)

    with open(sys.argv[1]) as f:
        source = f.read()

    result = instrument(source)

    with open(sys.argv[2], 'w') as f:
        f.write(result)
