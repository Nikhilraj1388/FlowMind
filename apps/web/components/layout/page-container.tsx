import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

const sizeClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[1400px]',
};

export function PageContainer({ children, className, size = 'default' }: PageContainerProps) {
  return (
    <div className={cn('container mx-auto px-4 sm:px-6', sizeClasses[size], className)}>
      {children}
    </div>
  );
}
