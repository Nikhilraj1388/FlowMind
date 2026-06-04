/**
 * Graph builder — Section 8.2
 * Converts a FlowTrace into React Flow nodes + edges with dagre layout.
 * Runs synchronously (Web Worker upgrade is a Phase 8.7 optimization).
 */
import dagre from '@dagrejs/dagre';
import type { Node, Edge } from '@xyflow/react';
import type { FlowTrace, TraceStep } from './types';

// ── Node data shapes ─────────────────────────────────────────────────────────

export interface StatementNodeData {
  label: string;
  line: number;
  stepIndex: number;
  nodeType: 'statement' | 'call' | 'return' | 'condition' | 'output' | 'assign' | 'loop';
  [key: string]: unknown;
}

export type FlowNode = Node<StatementNodeData>;
export type FlowEdge = Edge;

// ── Node sizing ──────────────────────────────────────────────────────────────

const NODE_WIDTH = 180;
const NODE_HEIGHT = 40;
const MAX_NODES = 300; // cap to keep React Flow performant

// ── Label builders ───────────────────────────────────────────────────────────

function serializeShort(v: unknown): string {
  if (v === null || v === undefined) return String(v);
  if (typeof v === 'object' && 'value' in (v as object)) {
    const sv = (v as { type: string; value: unknown });
    if (sv.type === 'array') return `[…${(sv as { length?: number }).length ?? '?'}]`;
    if (sv.type === 'object') return '{…}';
    if (sv.type === 'function') return sv.value as string;
    return String(sv.value);
  }
  return String(v);
}

function stepLabel(step: TraceStep): string {
  switch (step.type) {
    case 'call': {
      const args = Object.entries(step.arguments ?? {})
        .map(([k, v]) => `${k}=${serializeShort(v)}`)
        .join(', ');
      return `${step.functionName}(${args})`;
    }
    case 'return':
      return `↩ ${step.functionName}: ${serializeShort(step.returnValue)}`;
    case 'assign':
      return `${step.variable} = ${serializeShort(step.newValue)}`;
    case 'condition':
      return `if ${step.expression ?? '?'} → ${step.branch}`;
    case 'loop_iter':
      return `loop L${step.loopLine}`;
    case 'output':
      return `› ${(step.text ?? '').slice(0, 30)}`;
    case 'exception':
      return `✗ ${step.errorType}: ${(step.message ?? '').slice(0, 30)}`;
    case 'line':
      return `L${step.line}`;
    default:
      return `${step.type} L${step.line}`;
  }
}

function stepNodeType(step: TraceStep): StatementNodeData['nodeType'] {
  switch (step.type) {
    case 'call': return 'call';
    case 'return': return 'return';
    case 'condition': return 'condition';
    case 'output': return 'output';
    case 'assign': return 'assign';
    case 'loop_iter': return 'loop';
    default: return 'statement';
  }
}

// ── Step filter — skip noisy 'line' steps to keep graph readable ─────────────

const VISIBLE_TYPES = new Set<TraceStep['type']>([
  'call', 'return', 'assign', 'condition', 'loop_iter', 'output', 'exception',
]);

// ── Main builder ─────────────────────────────────────────────────────────────

export function buildGraph(trace: FlowTrace): { nodes: FlowNode[]; edges: FlowEdge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 30, ranksep: 50, marginx: 20, marginy: 20 });

  const rawNodes: FlowNode[] = [];
  const rawEdges: FlowEdge[] = [];

  // Filter and cap steps
  const visibleSteps = trace.steps
    .filter((s) => VISIBLE_TYPES.has(s.type))
    .slice(0, MAX_NODES);

  visibleSteps.forEach((step, i) => {
    const id = `n${i}`;
    g.setNode(id, { width: NODE_WIDTH, height: NODE_HEIGHT });

    rawNodes.push({
      id,
      type: 'flowNode',
      position: { x: 0, y: 0 }, // set by dagre below
      data: {
        label: stepLabel(step),
        line: step.line,
        stepIndex: step.index,
        nodeType: stepNodeType(step),
      },
    });

    if (i > 0) {
      const edgeId = `e${i - 1}-${i}`;
      g.setEdge(`n${i - 1}`, id);
      rawEdges.push({
        id: edgeId,
        source: `n${i - 1}`,
        target: id,
        type: step.type === 'call' ? 'smoothstep' : 'default',
        animated: step.type === 'call' || step.type === 'return',
        style: { stroke: 'var(--border)', strokeWidth: 1.5 },
      });
    }
  });

  // Apply dagre layout
  dagre.layout(g);

  rawNodes.forEach((node) => {
    const pos = g.node(node.id);
    if (pos) {
      node.position = { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 };
    }
  });

  return { nodes: rawNodes, edges: rawEdges };
}

// ── Recursion tree builder — Section 8.3 ────────────────────────────────────

import type { RecursionTreeNode } from './types';

export function buildRecursionTree(
  trace: FlowTrace,
  targetFunction?: string,
): RecursionTreeNode | null {
  const callStack: RecursionTreeNode[] = [];
  let root: RecursionTreeNode | null = null;

  for (const step of trace.steps) {
    if (
      step.type === 'call' &&
      (!targetFunction || step.functionName === targetFunction)
    ) {
      const node: RecursionTreeNode = {
        id: step.frameId,
        functionName: step.functionName ?? '<fn>',
        arguments: step.arguments ?? {},
        depth: step.depth ?? 0,
        stepIndex: step.index,
        returnValue: null,
        children: [],
      };
      if (callStack.length === 0) {
        root = node;
      } else {
        callStack[callStack.length - 1].children.push(node);
      }
      callStack.push(node);
    }
    if (step.type === 'return') {
      const node = callStack.pop();
      if (node) node.returnValue = step.returnValue ?? null;
    }
  }
  return root;
}

// ── Output collector ─────────────────────────────────────────────────────────

export interface OutputLine {
  stepIndex: number;
  text: string;
  stream: 'stdout' | 'stderr';
}

export function collectOutput(trace: FlowTrace): OutputLine[] {
  return trace.steps
    .filter((s) => s.type === 'output')
    .map((s) => ({
      stepIndex: s.index,
      text: s.text ?? '',
      stream: s.stream ?? 'stdout',
    }));
}
