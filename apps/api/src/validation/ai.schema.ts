import { z } from 'zod';

export const explainSchema = z.object({
  executionId: z.string().min(1),
  projectId: z.string().min(1),
});

export const chatSchema = z.object({
  projectId: z.string().min(1),
  executionId: z.string().optional(),
  message: z.string().min(1).max(4000),
});

export type ExplainInput = z.infer<typeof explainSchema>;
export type ChatInput = z.infer<typeof chatSchema>;
