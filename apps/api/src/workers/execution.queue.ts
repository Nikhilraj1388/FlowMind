import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { logger } from '../utils/logger';

/**
 * BullMQ Execution Queue — Section 6.8
 * Separate Redis connection from the shared ioredis instance to avoid
 * BullMQ's maxRetriesPerRequest requirement conflicting with the app pool.
 *
 * NOTE: The canonical queue setup lives in queues/execution.queue.ts.
 * This re-export provides access from the workers/ directory for convenience.
 */

export interface ExecutionJobData {
  executionId: string;
  code: string;
  language: string;
  stdin: string;
  userId: string;
}

/** Dedicated Redis connection for BullMQ (needs maxRetriesPerRequest: null). */
export const redisConnection = new IORedis(
  process.env.REDIS_URL ?? 'redis://localhost:6379',
  {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  },
);

/** BullMQ Queue for code execution jobs. */
export const executionQueue = new Queue<ExecutionJobData>('execution', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 1,
  },
});

executionQueue.on('error', (err) => {
  logger.error('ExecutionQueue error', { message: err.message });
});

logger.info('ExecutionQueue initialized (workers/execution.queue)');
