/** Shared types — execution/trace types added in Phase 6+ */

export type Language = 'javascript' | 'python' | 'java' | 'cpp';

export type ExecutionStatus =
  | 'QUEUED'
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'
  | 'TIMEOUT'
  | 'CANCELLED';

export interface Project {
  id: string;
  title: string;
  language: Language;
  updatedAt: string;
  executionCount: number;
  lastExecutionStatus?: ExecutionStatus;
}

export interface MockExecution {
  id: string;
  projectId: string;
  projectTitle: string;
  language: Language;
  status: ExecutionStatus;
  stepCount: number;
  durationMs: number;
  createdAt: string;
}
