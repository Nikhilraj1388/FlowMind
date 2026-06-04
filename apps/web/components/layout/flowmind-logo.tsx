import Link from 'next/link';
import { Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowMindLogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

export function FlowMindLogo({ className, showText = true, href = '/' }: FlowMindLogoProps) {
  const content = (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)]">
        <Code2 className="size-6 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          FlowMind
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
