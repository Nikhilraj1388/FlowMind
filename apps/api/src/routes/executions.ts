import { Router } from 'express';
import { executionService } from '../services/execution.service';
import { executionRateLimiter } from '../middleware/rate-limiter';
import { validate } from '../middleware/validate';
import { createExecutionSchema } from '../schemas/execution.schema';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { Response, NextFunction, Request } from 'express';

/**
 * Execution routes — Section 6.2 / 11.4
 * Mounted at /api/v1/executions (auth + rate-limit applied in app.ts).
 *
 * POST  /             → create   (submit code for execution)
 * GET   /:id/status   → status   (poll execution status)
 * GET   /:id/trace    → getTrace (retrieve trace data)
 */
const router = Router();

const asAuth = (req: Request) => req as unknown as AuthenticatedRequest;

/**
 * POST /api/v1/executions — Submit code for execution.
 * Applies executionRateLimiter (5/min for free tier) + body validation.
 */
router.post(
  '/',
  executionRateLimiter,
  validate(createExecutionSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = asAuth(req);
      const result = await executionService.create({
        userId: authReq.user.id,
        projectId: req.body.projectId,
        code: req.body.code,
        language: req.body.language,
        stdin: req.body.stdin,
      });
      res.status(202).json(result);
    } catch (err) {
      next(err);
    }
  },
);

/** GET /api/v1/executions/:id/status — Poll execution status. */
router.get('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executionService.getStatus(req.params.id, asAuth(req).user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** GET /api/v1/executions/:id/trace — Get trace data for a completed execution. */
router.get('/:id/trace', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executionService.getTrace(req.params.id, asAuth(req).user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export { router as executionRoutes };
