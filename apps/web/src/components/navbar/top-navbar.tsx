import { useLocation } from 'react-router-dom';
import { Menu, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarStore, useCommandPaletteStore, useThemeStore } from '@/store';
import { useIsMobile } from '@/hooks';
import { NotificationPanel } from './notification-panel';
import { UserMenu } from './user-menu';
import { mainNavigation } from '@/constants/navigation';
import { cn } from '@/lib/utils';

function getPageTitle(pathname: string): string {
  for (const group of mainNavigation) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(item.href + '/')) {
        return item.title;
      }
    }
  }
  return 'Dashboard';
}

export function TopNavbar() {
  const { pathname } = useLocation();
  const { setMobileOpen } = useSidebarStore();
  const { open: openCommandPalette } = useCommandPaletteStore();
  const { theme, setTheme } = useThemeStore();
  const isMobile = useIsMobile();
  const pageTitle = getPageTitle(pathname);

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 transition-colors">
      {/* Mobile menu trigger */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold tracking-tight truncate">{pageTitle}</h1>
      </div>

      {/* Search trigger — hidden on mobile */}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'hidden h-8 w-56 justify-start gap-2 text-muted-foreground md:flex',
          'hover:text-foreground hover:bg-accent/60 transition-colors'
        )}
        onClick={openCommandPalette}
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1 text-left text-xs">Search anything...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </Button>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Mobile search */}
        {isMobile && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openCommandPalette}>
            <Search className="h-4 w-4" />
          </Button>
        )}

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="h-4 w-4 transition-transform hover:rotate-12" />
          ) : (
            <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
          )}
        </Button>

        <NotificationPanel />
        <UserMenu />
      </div>
    </header>
  );
}
