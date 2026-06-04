'use client';

import Link from 'next/link';
import { Bell, Search, Home } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { FlowMindLogo } from './flowmind-logo';

/**
 * Dashboard header with search, notifications, and authenticated user button.
 */
export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border/50 bg-card/30 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <FlowMindLogo href="/dashboard" showText={false} />
      </div>
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search projects..."
          className="h-9 w-full rounded-lg border border-border bg-muted/30 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search projects"
        />
      </div>
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Home className="size-4" />
            Home
          </Button>
        </Link>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'size-8',
            },
          }}
        />
      </div>
    </header>
  );
}
