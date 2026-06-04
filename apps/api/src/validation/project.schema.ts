import { z } from 'zod';

/** Language enum matching Prisma schema */
const languageEnum = z.enum(['JAVASCRIPT', 'PYTHON', 'CPP', 'JAVA']);

/** POST /projects — Section 11.3 */
export const createProjectSchema = z.object({
  title: z.string().min(1).max(200).default('Untitled Project'),
  language: languageEnum,
  code: z.string().max(102400).default(''),
});

/** PATCH /projects/:id — Section 11.3 */
export const updateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  code: z.string().max(102400).optional(),
  language: languageEnum.optional(),
  version: z.number().int().positive(),
});

/** GET /projects query params */
export const listProjectsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  language: languageEnum.optional(),
  search: z.string().max(200).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ListProjectsInput = z.infer<typeof listProjectsSchema>;
