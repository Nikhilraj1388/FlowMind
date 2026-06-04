import type { Language } from './index';

export type ExecutionStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'TIMEOUT' | 'CANCELLED';

export interface Execution {
  id: string;
  projectId: string;
  userId: string;
  code: string;
  language: Language;
  status: ExecutionStatus;
  stdout: string | null;
  stderr: string | null;
  exitCode: number | null;
  traceData: FlowTrace | null;
  durationMs: number | null;
  stepCount: number | null;
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateExecutionInput {
  projectId: string;
  code: string;
  language: Language;
  stdin?: string;
}

/** FlowTrace schema v1 — deterministic execution trace */
export interface FlowTrace {
  version: '1.0.0';
  metadata: TraceMetadata;
  source: { original: string; lineCount: number; hash: string };
  steps: TraceStep[];
  stats: TraceStats;
}

export interface TraceMetadata {
  language: Language;
  executionId: string;
  startTime: string;
  endTime: string;
}

export type StepType = 'line' | 'call' | 'return' | 'assign' | 'condition' | 'loop_iter' | 'exception' | 'output';

export interface TraceStep {
  index: number;
  type: StepType;
  line: number;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface TraceStats {
  totalSteps: number;
  maxDepth: number;
  uniqueLines: number;
  durationMs: number;
}
