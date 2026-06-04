import { Router } from 'express';
import { projectService } from '../services/project.service';
import { validate } from '../middleware/validate';
import { createProjectSchema, updateProjectSchema, listProjectsQuery } from '../schemas/project.schema';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { Response, NextFunction, Request } from 'express';

/**
 * Project routes — Section 6.2 / 11.3
 * Mounted at /api/v1/projects (auth + rate-limit applied in app.ts).
 *
 * GET    /              → list
 * POST   /              → create
 * GET    /:id           → get
 * PATCH  /:id           → update
 * DELETE /:id           → delete
 * POST   /:id/duplicate → duplicate (clone)
 */
const router = Router();

const asAuth = (req: Request) => req as unknown as AuthenticatedRequest;

/** GET /api/v1/projects — Paginated list with optional language/search filters. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = listProjectsQuery.parse(req.query);
    const result = await projectService.list(asAuth(req).user.id, query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** POST /api/v1/projects — Create a new project. */
router.post('/', validate(createProjectSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.create(asAuth(req).user.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

/** GET /api/v1/projects/:id — Get a single project. */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.getById(req.params.id, asAuth(req).user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** PATCH /api/v1/projects/:id — Update with version check. */
router.patch('/:id', validate(updateProjectSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.update(req.params.id, asAuth(req).user.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/v1/projects/:id — Delete a project. */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.delete(req.params.id, asAuth(req).user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

/** POST /api/v1/projects/:id/duplicate — Clone a project. */
router.post('/:id/duplicate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await projectService.duplicate(req.params.id, asAuth(req).user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

export { router as projectRoutes };
