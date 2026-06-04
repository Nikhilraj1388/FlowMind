import { prisma } from '../config/prisma';
import { NotFoundError } from '../utils/errors';

/**
 * User service — Section 6.4
 * Handles user sync from Clerk webhooks, profile retrieval, and updates.
 */
export const userService = {
  /**
   * Find or create a user by their Clerk ID.
   * Used by the auth middleware to upsert on every request.
   */
  async findOrCreateByClerkId(clerkId: string, email: string) {
    return prisma.user.upsert({
      where: { clerkId },
      update: {},
      create: {
        clerkId,
        email: email ?? `${clerkId}@clerk.local`,
      },
    });
  },

  /**
   * Get user with usage stats for GET /users/me — Section 11.2.
   * Returns execution count today and AI request count today.
   */
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User');

    // Count today's executions and AI requests
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [executionsToday, aiRequestsToday] = await Promise.all([
      prisma.execution.count({
        where: { userId, createdAt: { gte: todayStart } },
      }),
      prisma.aIChatMessage.count({
        where: {
          userId,
          role: 'USER',
          createdAt: { gte: todayStart },
        },
      }),
    ]);

    const executionsLimit = user.plan === 'FREE' ? 10 : user.plan === 'PRO' ? 100 : 500;
    const aiRequestsLimit = user.plan === 'FREE' ? 5 : user.plan === 'PRO' ? 50 : 200;

    return {
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        plan: user.plan,
        createdAt: user.createdAt,
        usage: {
          executionsToday,
          executionsLimit,
          aiRequestsToday,
          aiRequestsLimit,
        },
      },
    };
  },

  /**
   * Update the current user's profile (name, avatarUrl).
   */
  async updateMe(userId: string, data: { name?: string; avatarUrl?: string }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User');

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
      },
    });

    return { data: updated };
  },

  /** Sync user from Clerk webhook payload. */
  async syncFromClerk(clerkId: string, email: string, name?: string, avatarUrl?: string) {
    return prisma.user.upsert({
      where: { clerkId },
      update: { email, name: name ?? undefined, avatarUrl: avatarUrl ?? undefined },
      create: { clerkId, email, name, avatarUrl },
    });
  },
};
