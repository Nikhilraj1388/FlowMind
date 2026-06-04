import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { projectService } from '../services/project.service';
import {
  createProjectSchema,
  updateProjectSchema,
  listProjectsSchema,
} from '../validation/project.schema';

/**
 * Project controller — Section 6.3
 * Thin layer: parse → validate → delegate to service → respond.
 */
export const projectController = {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = listProjectsSchema.parse(req.query);
      const result = await projectService.list(req.user.id, params);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async get(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await projectService.get(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = createProjectSchema.parse(req.body);
      const result = await projectService.create(req.user.id, input);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = updateProjectSchema.parse(req.body);
      const result = await projectService.update(req.params.id as string, req.user.id, input);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await projectService.delete(req.params.id as string, req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  async listExecutions(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await projectService.listExecutions(req.params.id as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
