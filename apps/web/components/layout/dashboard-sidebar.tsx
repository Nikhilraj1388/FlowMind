'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  History,
  LayoutTemplate,
  Settings,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowMindLogo } from './flowmind-logo';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard', label: 'Projects', icon: FolderOpen },
  { href: '/dashboard', label: 'History', icon: History },
  { href: '/dashboard', label: 'Templates', icon: LayoutTemplate },
  { href: '/dashboard', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border/50 bg-card/20 md:flex">
      <div className="border-b border-border/50 p-4">
        <FlowMindLogo href="/dashboard" />
      </div>
      <div className="p-3">
        <Link href="/workspace">
          <Button variant="gradient" className="w-full" size="sm">
            <Plus className="size-4" />
            New Project
          </Button>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
