export type Language = 'javascript' | 'python' | 'java' | 'cpp';

export type VizTab = 'graph' | 'recursion' | 'memory' | 'output';

export interface MockGraphNode {
  id: string;
  label: string;
  type: 'statement' | 'condition' | 'call';
  active?: boolean;
}

export interface MockGraphEdge {
  id: string;
  source: string;
  target: string;
}

/* Domain type re-exports */
export type { Project, CreateProjectInput, UpdateProjectInput } from './project';
export type {
  Execution,
  ExecutionStatus,
  FlowTrace,
  TraceStep,
  StepType,
  CreateExecutionInput,
  TraceMetadata,
  TraceStats,
} from './execution';
export type {
  AIChatMessage,
  AIMessageRole,
  AIMessageType,
  ExplainInput,
  ChatInput,
} from './ai';
