import 'dotenv/config';
import { createApp } from './app';
import { prisma } from './config/prisma';
import { redis } from './config/redis';
import { startExecutionWorker } from './workers/execution.worker';
import { logger } from './utils/logger';

const PORT = parseInt(process.env.PORT ?? '4000', 10);

async function bootstrap() {
  // Verify database connectivity before starting the HTTP server
  try {
    await prisma.$connect();
    logger.info('PostgreSQL connected');
  } catch (err) {
    logger.error('PostgreSQL connection failed', { message: (err as Error).message });
    process.exit(1);
  }

  const app = createApp();

  // Start the BullMQ execution worker
  const worker = startExecutionWorker();

  const server = app.listen(PORT, () => {
    logger.info('FlowMind API running', {
      port: PORT,
      env: process.env.NODE_ENV ?? 'development',
    });
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(async () => {
      await worker.close();
      await prisma.$disconnect();
      redis.disconnect();
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Bootstrap failed', {
    message: (err as Error).message,
    stack: (err as Error).stack,
  });
  process.exit(1);
});
