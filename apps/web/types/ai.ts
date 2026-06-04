export type AIMessageRole = 'user' | 'assistant' | 'system';
export type AIMessageType = 'EXPLANATION' | 'DEBUG' | 'CHAT' | 'COMPLEXITY' | 'OPTIMIZATION';

export interface AIChatMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  type: AIMessageType;
  createdAt: string;
}

export interface ExplainInput {
  executionId: string;
  stepRange?: { start: number; end: number };
}

export interface ChatInput {
  projectId: string;
  executionId?: string;
  message: string;
}
