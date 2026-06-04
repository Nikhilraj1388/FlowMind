import { Queue } from 'bullmq';
import { logger } from '../utils/logger';

export interface ExecutionJobData {
  executionId: string;
  code: string;
  language: string;
  stdin: string;
  userId: string;
}

/**
 * Parse the Redis URL into BullMQ connection options.
 * BullMQ bundles its own ioredis — we pass plain options to avoid
 * version conflicts with the shared ioredis instance.
 *
 * NOTE: This function is called lazily (on first getQueue() call) so
 * that dotenv/config has already populated process.env by the time
 * the connection is created.
 */
function makeConnection() {
  const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || '6379', 10),
    password: parsed.password || undefined,
    db: parsed.pathname ? parseInt(parsed.pathname.replace('/', '') || '0', 10) : 0,
    maxRetriesPerRequest: null as null, // required by BullMQ
  };
}

let _queue: Queue<ExecutionJobData> | null = null;

/**
 * Lazily initializes the BullMQ Queue on first access.
 * Ensures REDIS_URL is loaded from env before the connection is created.
 */
export function getExecutionQueue(): Queue<ExecutionJobData> {
  if (!_queue) {
    _queue = new Queue<ExecutionJobData>('execution', {
      connection: makeConnection(),
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 1,
      },
    });

    _queue.on('error', (err) => {
      logger.error('ExecutionQueue error', { message: err.message });
    });

    logger.info('ExecutionQueue initialized');
  }
  return _queue;
}
