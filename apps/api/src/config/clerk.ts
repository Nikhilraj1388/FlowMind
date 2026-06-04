import { verifyToken } from '@clerk/backend';

/**
 * Verify a Clerk session token and return the sub (clerkId).
 */
export async function verifyClerkToken(token: string): Promise<{ sub: string; email?: string }> {
  const payload = await verifyToken(token, {
    secretKey: process.env.CLERK_SECRET_KEY ?? '',
  });
  return {
    sub: payload.sub,
    email: (payload as Record<string, unknown>)['email'] as string | undefined,
  };
}
