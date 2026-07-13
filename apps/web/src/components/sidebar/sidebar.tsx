import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store';
import { useIsMobile } from '@/hooks';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/constants/app';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';
import { SidebarFooter } from './sidebar-footer';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter />
    </div>
  );
}

export function Sidebar() {
  const { isCollapsed, isMobileOpen, setMobileOpen } = useSidebarStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0 border-r border-sidebar-border">
          <VisuallyHidden.Root>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden.Root>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-sidebar-border bg-sidebar',
        'transition-[width] duration-300 ease-in-out overflow-hidden'
      )}
      style={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
    >
      <SidebarContent />
    </aside>
  );
}
