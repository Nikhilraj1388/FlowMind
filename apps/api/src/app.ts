import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error-handler';
import { rateLimiter } from './middleware/rate-limiter';
import { requestLogger } from './middleware/request-logger';
import { projectRoutes } from './routes/projects';
import { executionRoutes } from './routes/executions';
import { userRoutes } from './routes/users';
import { aiRoutes } from './routes/ai';

/**
 * Express application factory — Section 6.1
 * Creates and configures the full middleware + routing stack.
 * Called once from index.ts.
 */
export function createApp() {
  const app = express();

  // ── Security & parsing ─────────────────────────────────────────────────────
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ['http://localhost:3000'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(requestLogger);

  // ── Public routes ──────────────────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/health/detailed', async (_req, res) => {
    const start = Date.now();
    const checks: Record<string, { status: string; latencyMs?: number; error?: string }> = {};

    // Check PostgreSQL
    try {
      const { prisma } = await import('./config/prisma');
      const dbStart = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      checks.database = { status: 'healthy', latencyMs: Date.now() - dbStart };
    } catch (err) {
      checks.database = { status: 'unhealthy', error: (err as Error).message };
    }

    // Check Redis
    try {
      const { redis } = await import('./config/redis');
      const redisStart = Date.now();
      await redis.ping();
      checks.redis = { status: 'healthy', latencyMs: Date.now() - redisStart };
    } catch (err) {
      checks.redis = { status: 'unhealthy', error: (err as Error).message };
    }

    const allHealthy = Object.values(checks).every((c) => c.status === 'healthy');
    res.status(allHealthy ? 200 : 503).json({
      status: allHealthy ? 'healthy' : 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      responseTimeMs: Date.now() - start,
      checks,
    });
  });

  // ── Protected routes ───────────────────────────────────────────────────────
  app.use('/api/v1/users', authMiddleware, userRoutes);
  app.use('/api/v1/projects', authMiddleware, rateLimiter, projectRoutes);
  app.use('/api/v1/executions', authMiddleware, rateLimiter, executionRoutes);
  app.use('/api/v1/ai', authMiddleware, aiRoutes);

  // ── Global error handler (must be last) ───────────────────────────────────
  app.use(errorHandler);

  return app;
}
