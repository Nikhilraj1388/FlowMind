import { z } from 'zod';

/** POST /executions — Section 11.4 */
export const createExecutionSchema = z.object({
  projectId: z.string().cuid(),
  code: z.string().min(1).max(102400),
  language: z.enum(['JAVASCRIPT', 'PYTHON', 'CPP', 'JAVA']),
  stdin: z.string().max(10240).default(''),
});

export type CreateExecutionInput = z.infer<typeof createExecutionSchema>;
