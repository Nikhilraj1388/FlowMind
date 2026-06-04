/**
 * BullMQ Execution Worker — Section 6.8
 * Consumes jobs from the 'execution' queue.
 * Full pipeline: QUEUED → RUNNING → COMPLETED/FAILED/TIMEOUT
 */
import { Worker } from 'bullmq';
import { prisma } from '../config/prisma';
import { getHandler } from '../execution/languages';
import { logger } from '../utils/logger';
import type { ExecutionJobData } from '../queues/execution.queue';
import type { Language } from '../execution/types';

function getRedisConnection() {
  const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || '6379', 10),
    password: parsed.password || undefined,
    db: parsed.pathname ? parseInt(parsed.pathname.replace('/', '') || '0', 10) : 0,
    maxRetriesPerRequest: null as null,
  };
}

export function startExecutionWorker() {
  const worker = new Worker<ExecutionJobData>(
    'execution',
    async (job) => {
      const { executionId, code, language, stdin, userId } = job.data;

      logger.info('Execution job started', { executionId, language });

      // 1. Mark as RUNNING
      await prisma.execution.update({
        where: { id: executionId },
        data: { status: 'RUNNING' },
      });

      try {
        // 2. Get language handler
        const handler = getHandler(language as Language);

        // 3. Execute
        const result = await handler.execute({
          executionId,
          code,
          language: language as Language,
          stdin,
        });

        // 4. Store trace inline (JSONB) — large trace S3 offload in Phase 7
        const traceSize = JSON.stringify(result.trace).length;

        await prisma.execution.update({
          where: { id: executionId },
          data: {
            status: 'COMPLETED',
            stdout: result.stdout.slice(0, 1_048_576),    // 1 MB cap
            stderr: result.stderr.slice(0, 1_048_576),
            exitCode: result.exitCode,
            traceData: result.trace as object,
            traceSize,
            durationMs: result.durationMs,
            stepCount: result.trace.stats.totalSteps,
            completedAt: new Date(),
          },
        });

        logger.info('Execution completed', {
          executionId,
          durationMs: result.durationMs,
          steps: result.trace.stats.totalSteps,
        });
      } catch (err) {
        const msg = (err as Error).message ?? 'Unknown error';
        const isTimeout = msg.toLowerCase().includes('timed out') || msg.toLowerCase().includes('timeout');

        await prisma.execution.update({
          where: { id: executionId },
          data: {
            status: isTimeout ? 'TIMEOUT' : 'FAILED',
            errorMessage: msg,
            stderr: msg,
            completedAt: new Date(),
          },
        });

        logger.error('Execution failed', { executionId, message: msg });
        // Don't re-throw — job marked as completed so BullMQ doesn't retry
      }
    },
    {
      connection: getRedisConnection(),
      concurrency: parseInt(process.env.WORKER_CONCURRENCY ?? '3', 10),
    },
  );

  worker.on('failed', (job, err) => {
    logger.error('Worker job failed', { jobId: job?.id, message: err.message });
  });

  worker.on('error', (err) => {
    logger.error('Worker error', { message: err.message });
  });

  logger.info('ExecutionWorker started', {
    concurrency: parseInt(process.env.WORKER_CONCURRENCY ?? '3', 10),
  });

  return worker;
}
