import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';

/**
 * Global error handler — Section 6.7
 * Must be the LAST middleware registered in app.ts (4 params signature).
 * Formats all errors into the standard API error envelope.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  // Convert Zod validation errors
  if (err instanceof ZodError) {
    const validationError = new ValidationError(
      err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
    );
    res.status(400).json({
      error: {
        code: validationError.code,
        message: validationError.message,
        details: validationError.details,
      },
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn('AppError', { code: err.code, statusCode: err.statusCode, message: err.message });
    res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
    return;
  }

  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
}
