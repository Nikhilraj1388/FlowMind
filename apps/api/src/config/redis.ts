import IORedis from 'ioredis';
import { logger } from '../utils/logger';

/**
 * Shared Redis client for rate limiting and general use.
 * Auto-connects on creation (no lazyConnect).
 * BullMQ uses its own separate connection via getExecutionQueue().
 */
export const redis = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy: (times) => Math.min(times * 100, 3000),
});

redis.on('connect', () => logger.info('Redis connected'));
redis.on('ready', () => logger.info('Redis ready'));
redis.on('error', (err) => logger.error('Redis error', { message: err.message }));
