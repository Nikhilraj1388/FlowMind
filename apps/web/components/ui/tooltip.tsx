'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Lightweight tooltip using CSS hover.
 * Replace with Radix Tooltip when @radix-ui/react-tooltip is installed.
 */
export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          'pointer-events-none absolute z-50 hidden rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md group-hover:block',
          positionClasses[side],
          className,
        )}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
