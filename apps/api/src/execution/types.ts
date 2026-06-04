/**
 * Execution engine types — Section 7.2 / 7.4
 * FlowTrace JSON Schema v1 + language handler interfaces.
 */

export type Language = 'JAVASCRIPT' | 'PYTHON' | 'CPP' | 'JAVA';

// ── FlowTrace schema ─────────────────────────────────────────────────────────

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
  // loop_iter
  loopLine?: number;
  iteration?: number;
  // output
  text?: string;
  stream?: 'stdout' | 'stderr';
  // exception
  errorType?: string;
  message?: string;
  stackTrace?: string;
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

export interface TraceStats {
  totalSteps: number;
  maxDepth: number;
  functionCalls: number;
  assignments: number;
  outputLines: number;
  memoryPeakBytes: number | null;
}

export interface TraceMetadata {
  language: string;
  executionId: string;
  startedAt: string;
  completedAt: string;
  durationMs: number;
  exitCode: number;
  instrumentationVersion: string;
}

export interface TraceSource {
  original: string;
  lineCount: number;
  hash: string;
}

export interface FlowTrace {
  version: '1.0.0';
  metadata: TraceMetadata;
  source: TraceSource;
  steps: TraceStep[];
  frames: TraceFrame[];
  stats: TraceStats;
  truncated?: boolean;
}

// ── Language handler interface — Section 7.4 ────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface InstrumentResult {
  code: string;
  sourceMap?: string;
}

export interface ExecuteParams {
  executionId: string;
  code: string;
  language: Language;
  stdin?: string;
  timeoutMs?: number;
}

export interface ExecuteResult {
  trace: FlowTrace;
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
}

export interface LanguageHandler {
  language: Language;
  fileExtension: string;
  maxCodeSize: number;
  defaultTimeoutMs: number;
  memoryLimitMb: number;
  validate(code: string): ValidationResult;
  instrument(code: string, executionId: string): InstrumentResult;
  execute(params: ExecuteParams): Promise<ExecuteResult>;
}

// ── Container result ─────────────────────────────────────────────────────────

export interface ContainerResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
  traceJson: string | null;
}
