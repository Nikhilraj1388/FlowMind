import { z } from 'zod';

/**
 * Project Zod schemas — Section 11.3
 * Canonical location: src/schemas/project.schema.ts
 */

/** Language enum matching Prisma schema */
const languageEnum = z.enum(['JAVASCRIPT', 'PYTHON', 'CPP', 'JAVA']);

/** POST /projects */
export const createProjectSchema = z.object({
  title: z.string().min(1).max(200).default('Untitled Project'),
  language: languageEnum,
  code: z.string().max(102400).default(''),
});

/** PATCH /projects/:id */
export const updateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  code: z.string().max(102400).optional(),
  language: languageEnum.optional(),
  version: z.number().int().positive().optional(),
});

/** GET /projects query params */
export const listProjectsQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  language: languageEnum.optional(),
  search: z.string().max(200).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ListProjectsQuery = z.infer<typeof listProjectsQuery>;
