import type { Request, Response, NextFunction } from 'express';
import { verifyClerkToken } from '../config/clerk';
import { prisma } from '../config/prisma';
import { UnauthorizedError } from '../utils/errors';
import type { User } from '@prisma/client';

/**
 * Extends Express Request to carry the authenticated user.
 * Downstream handlers cast req to AuthenticatedRequest.
 */
export interface AuthenticatedRequest extends Request {
  user: User;
}

/**
 * Auth middleware — Section 6.5
 * 1. Extracts Bearer token from Authorization header.
 * 2. Verifies the Clerk JWT via @clerk/backend.
 * 3. Upserts the user record in PostgreSQL.
 * 4. Attaches req.user for downstream handlers.
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedError('Missing authorization token');

    const { sub: clerkId, email } = await verifyClerkToken(token);

    // Upsert user — canonical sync is via Clerk webhook, but this fast-path
    // ensures auth works even before the first webhook fires.
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        email: email ?? `${clerkId}@clerk.local`,
      },
    });

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      next(err);
    } else {
      next(new UnauthorizedError('Invalid or expired token'));
    }
  }
}
