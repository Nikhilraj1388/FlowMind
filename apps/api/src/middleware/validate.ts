import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Validation middleware factory — Section 6.5
 * Accepts a Zod schema and returns Express middleware that parses req.body.
 * On success, the parsed (coerced/defaulted) value replaces req.body.
 * On failure, throws a ValidationError caught by the global error handler.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      throw new ValidationError(details);
    }

    req.body = result.data;
    next();
  };
}
