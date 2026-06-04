'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Auth-aware user menu component.
 * Shows sign-in/sign-up buttons when logged out, Clerk UserButton when logged in.
 */
export function UserMenu() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="size-8 animate-pulse rounded-full bg-muted" />;
  }

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'size-8',
          },
        }}
      />
    );
  }

  return (
    <>
      <Link href="/sign-in">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="gradient" size="sm">
          Get Started
        </Button>
      </Link>
    </>
  );
}
