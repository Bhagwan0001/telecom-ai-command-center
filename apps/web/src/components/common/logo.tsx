import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Zap className="h-4 w-4 text-primary-foreground" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-none tracking-tight">TAICC</span>
          <span className="text-[10px] text-muted-foreground leading-tight">Command Center</span>
        </div>
      )}
    </div>
  );
}
