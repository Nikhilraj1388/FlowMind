import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { userService } from '../services/user.service';

/**
 * User controller — Section 11.2
 */
export const userController = {
  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await userService.getMe(req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
