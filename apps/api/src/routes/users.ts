import { Router } from 'express';
import { userService } from '../services/user.service';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { Response, NextFunction, Request } from 'express';

/**
 * User routes — Section 11.2
 * Mounted at /api/v1/users (auth applied in app.ts).
 *
 * GET  /          → getMe    (current user profile + usage)
 * PATCH /         → updateMe (update name / avatarUrl)
 */
const router = Router();

const asAuth = (req: Request) => req as unknown as AuthenticatedRequest;

/** GET /api/v1/users — Get current user profile with usage stats. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getMe(asAuth(req).user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** PATCH /api/v1/users — Update current user profile. */
router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, avatarUrl } = req.body;
    const result = await userService.updateMe(asAuth(req).user.id, { name, avatarUrl });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export { router as userRoutes };
