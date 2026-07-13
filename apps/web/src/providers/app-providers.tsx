import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
