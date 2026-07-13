import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar/sidebar';
import { TopNavbar } from '@/components/navbar/top-navbar';
import { CommandPalette } from '@/components/command-palette/command-palette';
import { Breadcrumbs } from '@/components/common/breadcrumbs';
import { PageTransition } from '@/components/common/page-transition';
import { useSidebarStore } from '@/store';
import { useIsMobile } from '@/hooks';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/constants/app';
import { cn } from '@/lib/utils';

export function RootLayout() {
  const { isCollapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  const mainMargin = isMobile ? 0 : isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn('flex min-h-screen flex-col transition-[margin] duration-300 ease-in-out')}
        style={{ marginLeft: mainMargin }}
      >
        <TopNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-7">
          <Breadcrumbs />
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
