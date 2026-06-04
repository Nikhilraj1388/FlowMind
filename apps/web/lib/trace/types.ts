/**
 * Frontend FlowTrace types — mirrors apps/api/src/execution/types.ts
 * Kept local so the web app has no direct dependency on the API package.
 */

export type StepType =
  | 'line'
  | 'call'
  | 'return'
  | 'assign'
  | 'condition'
  | 'loop_iter'
  | 'exception'
  | 'output'
  | 'memory_alloc'
  | 'memory_free';

export interface SerializedValue {
  type: string;
  value: unknown;
  length?: number;
}

export interface TraceStep {
  index: number;
  timestamp: number;
  type: StepType;
  line: number;
  column?: number;
  frameId: string;
  // call
  functionName?: string;
  arguments?: Record<string, SerializedValue>;
  parentFrameId?: string;
  depth?: number;
  // return
  returnValue?: SerializedValue;
  // assign
  variable?: string;
  oldValue?: SerializedValue;
  newValue?: SerializedValue;
  // condition
  expression?: string;
  result?: boolean;
  branch?: 'true' | 'false';
  // loop
  loopLine?: number;
  // output
  text?: string;
  stream?: 'stdout' | 'stderr';
  // exception
  errorType?: string;
  message?: string;
  // variables snapshot (line/loop steps)
  variables?: Record<string, SerializedValue>;
}

export interface TraceFrame {
  id: string;
  functionName: string;
  depth: number;
  parentId?: string;
  variables: Record<string, SerializedValue>;
}

export interface FlowTrace {
  version: '1.0.0';
  metadata: {
    language: string;
    executionId: string;
    startedAt: string;
    completedAt: string;
    durationMs: number;
    exitCode: number;
    instrumentationVersion: string;
  };
  source: {
    original: string;
    lineCount: number;
    hash: string;
  };
  steps: TraceStep[];
  frames: TraceFrame[];
  stats: {
    totalSteps: number;
    maxDepth: number;
    functionCalls: number;
    assignments: number;
    outputLines: number;
    memoryPeakBytes: number | null;
  };
  truncated?: boolean;
}

/** Recursion tree node built from call/return steps */
export interface RecursionTreeNode {
  id: string;
  functionName: string;
  arguments: Record<string, SerializedValue>;
  depth: number;
  stepIndex: number;
  returnValue: SerializedValue | null;
  children: RecursionTreeNode[];
}
