import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redis } from '../config/redis';
import type { AuthenticatedRequest } from './auth';

/**
 * Redis-backed rate limiter — Section 6.5
 * General API: 60 req/min.
 */
export const rateLimiter = rateLimit({
  windowMs: 60_000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(...(args as [string, ...string[]])) as Promise<number>,
  }),
  handler: (_req, res) => {
    res.status(429).json({ error: { code: 'RATE_LIMIT', message: 'Too many requests' } });
  },
});

/**
 * Tighter limiter for execution submissions: 5/min.
 * Phase 6 will enforce per-plan limits on top of this.
 */
export const executionRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const authReq = req as unknown as AuthenticatedRequest;
    return authReq.user?.id ?? req.ip ?? 'anon';
  },
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redis.call(...(args as [string, ...string[]])) as Promise<number>,
  }),
  handler: (_req, res) => {
    res.status(429).json({ error: { code: 'RATE_LIMIT', message: 'Execution rate limit exceeded' } });
  },
});
