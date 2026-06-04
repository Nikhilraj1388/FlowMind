import { prisma } from '../config/prisma';
import { NotFoundError, ForbiddenError, ConflictError } from '../utils/errors';
import type { Language } from '@prisma/client';

/**
 * Project service — Section 6.4
 * All DB interactions for project CRUD go through here.
 */

interface CreateProjectInput {
  title?: string;
  language: string;
  code?: string;
}

interface UpdateProjectInput {
  title?: string;
  code?: string;
  language?: string;
  version?: number;
}

interface ListProjectsInput {
  page: number;
  limit: number;
  language?: string;
  search?: string;
}

export const projectService = {
  /**
   * List all projects for a user with pagination and optional filters.
   * Returns executionCount for each project.
   */
  async list(userId: string, params: ListProjectsInput) {
    const { page, limit, language, search } = params;
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(language ? { language: language as Language } : {}),
      ...(search
        ? { title: { contains: search, mode: 'insensitive' as const } }
        : {}),
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          language: true,
          updatedAt: true,
          _count: { select: { executions: true } },
          executions: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { status: true },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      data: projects.map((p) => ({
        id: p.id,
        title: p.title,
        language: p.language,
        updatedAt: p.updatedAt,
        executionCount: p._count.executions,
        lastExecutionStatus: p.executions[0]?.status ?? null,
      })),
      meta: { page, limit, total },
    };
  },

  /**
   * Get a single project by ID with ownership check.
   */
  async getById(id: string, userId: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundError('Project');
    if (project.userId !== userId) throw new ForbiddenError();
    return { data: project };
  },

  /** Create a new project. */
  async create(userId: string, input: CreateProjectInput) {
    const project = await prisma.project.create({
      data: {
        userId,
        title: input.title ?? 'Untitled Project',
        language: input.language as Language,
        code: input.code ?? '',
      },
    });
    return { data: project };
  },

  /**
   * Update a project with optimistic concurrency via version field.
   * Throws ConflictError (409) on version mismatch.
   */
  async update(id: string, userId: string, input: UpdateProjectInput) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('Project');
    if (existing.userId !== userId) throw new ForbiddenError();

    if (input.version !== undefined && existing.version !== input.version) {
      throw new ConflictError(
        `Version mismatch: expected ${existing.version}, got ${input.version}`,
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.code !== undefined ? { code: input.code } : {}),
        ...(input.language !== undefined ? { language: input.language as Language } : {}),
        version: { increment: 1 },
      },
    });
    return { data: project };
  },

  /** Delete a project with ownership check. */
  async delete(id: string, userId: string) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('Project');
    if (existing.userId !== userId) throw new ForbiddenError();
    await prisma.project.delete({ where: { id } });
  },

  /** Duplicate (clone) a project with ownership check. */
  async duplicate(id: string, userId: string) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('Project');
    if (existing.userId !== userId) throw new ForbiddenError();

    const clone = await prisma.project.create({
      data: {
        userId,
        title: `${existing.title} (copy)`,
        language: existing.language,
        code: existing.code,
      },
    });

    return { data: clone };
  },

  /** List executions for a project. */
  async listExecutions(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new NotFoundError('Project');
    if (project.userId !== userId) throw new ForbiddenError();

    const executions = await prisma.execution.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        status: true,
        language: true,
        durationMs: true,
        stepCount: true,
        createdAt: true,
        completedAt: true,
      },
    });
    return { data: executions };
  },
};
