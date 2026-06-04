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

  // ── Protected routes ───────────────────────────────────────────────────────
  app.use('/api/v1/users', authMiddleware, userRoutes);
  app.use('/api/v1/projects', authMiddleware, rateLimiter, projectRoutes);
  app.use('/api/v1/executions', authMiddleware, rateLimiter, executionRoutes);
  app.use('/api/v1/ai', authMiddleware, aiRoutes);

  // ── Global error handler (must be last) ───────────────────────────────────
  app.use(errorHandler);

  return app;
}
