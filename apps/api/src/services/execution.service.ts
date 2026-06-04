import { prisma } from '../config/prisma';
import { getExecutionQueue } from '../queues/execution.queue';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import { logger } from '../utils/logger';
import type { Language } from '@prisma/client';

/**
 * Execution service — Section 6.4
 * Orchestrates execution lifecycle: DB record → BullMQ queue → status polling.
 * Full execution logic (Docker sandboxing, instrumentation) is Phase 6.
 */

interface CreateExecutionParams {
  userId: string;
  projectId: string;
  code: string;
  language: string;
  stdin?: string;
}

export const executionService = {
  /**
   * Create execution record with QUEUED status and add to BullMQ queue.
   * Returns 202 QUEUED per API spec Section 11.4.
   */
  async create(params: CreateExecutionParams) {
    const { userId, projectId, code, language, stdin } = params;

    // 1. Create DB record with QUEUED status
    const execution = await prisma.execution.create({
      data: {
        userId,
        projectId,
        code,
        language: language as Language,
        status: 'QUEUED',
      },
      select: { id: true, status: true, createdAt: true },
    });

    // 2. Enqueue job — Phase 6 worker will consume this
    await getExecutionQueue().add(
      'execute' as never,
      {
        executionId: execution.id,
        code,
        language,
        stdin: stdin ?? '',
        userId,
      },
      { jobId: execution.id },
    );

    logger.info('Execution created', {
      executionId: execution.id,
      userId,
      language,
    });

    return { data: execution };
  },

  /**
   * Get execution status — lightweight polling response.
   * Includes ownership check.
   */
  async getStatus(executionId: string, userId: string) {
    const execution = await prisma.execution.findUnique({
      where: { id: executionId },
      select: {
        id: true,
        userId: true,
        status: true,
        durationMs: true,
        stepCount: true,
        stdout: true,
        stderr: true,
        exitCode: true,
        errorMessage: true,
        createdAt: true,
        completedAt: true,
      },
    });
    if (!execution) throw new NotFoundError('Execution');
    if (execution.userId !== userId) throw new ForbiddenError();

    // Strip userId from response
    const { userId: _uid, ...data } = execution;
    return { data };
  },

  /**
   * Get full trace JSON (traceData field) for a completed execution.
   * Includes ownership check.
   */
  async getTrace(executionId: string, userId: string) {
    const execution = await prisma.execution.findUnique({
      where: { id: executionId },
      select: { userId: true, traceData: true, status: true },
    });
    if (!execution) throw new NotFoundError('Execution');
    if (execution.userId !== userId) throw new ForbiddenError();

    return { data: { traceData: execution.traceData } };
  },

  /** Get full execution result (completed/failed). */
  async get(id: string, userId: string) {
    const execution = await prisma.execution.findUnique({ where: { id } });
    if (!execution) throw new NotFoundError('Execution');
    if (execution.userId !== userId) throw new ForbiddenError();
    return { data: execution };
  },

  /** Mark an execution as CANCELLED (if still QUEUED or RUNNING). */
  async cancel(id: string, userId: string) {
    const execution = await prisma.execution.findUnique({ where: { id } });
    if (!execution) throw new NotFoundError('Execution');
    if (execution.userId !== userId) throw new ForbiddenError();

    if (execution.status !== 'QUEUED' && execution.status !== 'RUNNING') {
      return { data: execution };
    }

    // Remove from queue if still waiting
    const job = await getExecutionQueue().getJob(id);
    if (job) await job.remove();

    const updated = await prisma.execution.update({
      where: { id },
      data: { status: 'CANCELLED', completedAt: new Date() },
    });

    return { data: updated };
  },
};
