import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Request logger middleware — Section 6.5
 * Logs method, URL, status, and latency for every request.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    logger.info('HTTP', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
    });
  });

  next();
}
