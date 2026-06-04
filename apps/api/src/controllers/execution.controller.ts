import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { executionService } from '../services/execution.service';
import { createExecutionSchema } from '../validation/execution.schema';

/**
 * Execution controller — Section 6.3
 */
export const executionController = {
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = createExecutionSchema.parse(req.body);
      const result = await executionService.create(req.user.id, input);
      res.status(202).json(result);
    } catch (err) {
      next(err);
    }
  },

  async get(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await executionService.get(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async status(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await executionService.getStatus(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getTrace(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await executionService.getTrace(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async cancel(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await executionService.cancel(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
