import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Route protection middleware for FlowMind.
 * 
 * Public routes: landing page, sign-in, sign-up, workspace (demo)
 * Protected routes: dashboard, project/*, settings, API routes
 */

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/workspace',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
