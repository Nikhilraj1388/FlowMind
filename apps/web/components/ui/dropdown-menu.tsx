'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/**
 * Simple dropdown menu using native details/summary.
 * Replace with Radix DropdownMenu for full keyboard navigation in Phase 3+.
 */
export function DropdownMenu({ trigger, children, align = 'end', className }: DropdownMenuProps) {
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <details className="group relative">
      <summary className="list-none cursor-pointer">{trigger}</summary>
      <div
        className={cn(
          'absolute top-full z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-popover p-1 shadow-lg',
          alignClasses[align],
          className,
        )}
      >
        {children}
      </div>
    </details>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  className?: string;
}

export function DropdownItem({ children, onClick, destructive, className }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        destructive
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-foreground hover:bg-accent',
        className,
      )}
    >
      {children}
    </button>
  );
}
