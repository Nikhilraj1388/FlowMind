/**
 * AppError hierarchy — Section 6.7
 * All domain errors extend AppError so the global error handler can
 * format them consistently.
 */

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`);
  }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super(400, 'VALIDATION_ERROR', 'Invalid request data', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, 'FORBIDDEN', message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, 'CONFLICT', message);
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(429, 'RATE_LIMIT', 'Too many requests');
  }
}

export class ExecutionError extends AppError {
  constructor(message: string, details?: unknown) {
    super(422, 'EXECUTION_ERROR', message, details);
  }
}
