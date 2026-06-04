/**
 * Trace summarizer — Section 9.4
 * Reduces a full FlowTrace to a token-budget-friendly summary
 * that grounds the AI in actual execution data.
 */
import type { FlowTrace, TraceStep } from '../execution/types';

export interface TraceSummary {
  totalSteps: number;
  durationMs: number;
  functionCalls: string[];
  output: string;
  keySteps: KeyStep[];
  finalVariables: Record<string, unknown>;
  maxDepth: number;
  hadException: boolean;
  language: string;
}

interface KeyStep {
  index: number;
  type: string;
  line: number;
  description: string;
}

const KEY_TYPES = new Set(['call', 'return', 'condition', 'assign', 'exception', 'output']);
const MAX_KEY_STEPS = 50;

function formatStepDescription(step: TraceStep): string {
  switch (step.type) {
    case 'call':
      return `${step.functionName}(${Object.entries(step.arguments ?? {})
        .map(([k, v]) => `${k}=${JSON.stringify((v as { value: unknown })?.value ?? v)}`)
        .join(', ')})`;
    case 'return':
      return `← ${step.functionName} returned ${JSON.stringify((step.returnValue as { value: unknown })?.value ?? step.returnValue)}`;
    case 'condition':
      return `${step.expression} → ${step.branch}`;
    case 'assign':
      return `${step.variable} = ${JSON.stringify((step.newValue as { value: unknown })?.value ?? step.newValue)}`;
    case 'output':
      return `stdout: "${(step.text ?? '').slice(0, 80)}"`;
    case 'exception':
      return `${step.errorType}: ${step.message}`;
    default:
      return `${step.type} at L${step.line}`;
  }
}

function selectKeySteps(steps: TraceStep[]): TraceStep[] {
  const keyByType = steps.filter((s) => KEY_TYPES.has(s.type));
  if (keyByType.length <= MAX_KEY_STEPS) return keyByType;

  // Evenly sample when too many
  const interval = Math.ceil(keyByType.length / MAX_KEY_STEPS);
  return keyByType.filter((_, i) => i % interval === 0).slice(0, MAX_KEY_STEPS);
}

function extractUniqueFunctions(steps: TraceStep[]): string[] {
  const seen = new Set<string>();
  for (const s of steps) {
    if (s.type === 'call' && s.functionName) seen.add(s.functionName);
  }
  return [...seen];
}

export function summarizeTrace(trace: FlowTrace): TraceSummary {
  const keySteps = selectKeySteps(trace.steps);
  const lastStep = trace.steps[trace.steps.length - 1];

  return {
    totalSteps: trace.stats.totalSteps,
    durationMs: trace.metadata.durationMs,
    functionCalls: extractUniqueFunctions(trace.steps),
    output: trace.steps
      .filter((s) => s.type === 'output' && s.stream === 'stdout')
      .map((s) => s.text ?? '')
      .join('\n'),
    keySteps: keySteps.map((s) => ({
      index: s.index,
      type: s.type,
      line: s.line,
      description: formatStepDescription(s),
    })),
    finalVariables: lastStep?.variables ?? {},
    maxDepth: trace.stats.maxDepth,
    hadException: trace.steps.some((s) => s.type === 'exception'),
    language: trace.metadata.language,
  };
}
