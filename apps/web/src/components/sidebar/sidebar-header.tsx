import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/store';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarHeader() {
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <div
      className={cn(
        'flex h-14 items-center border-b border-sidebar-border px-3 shrink-0',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}
    >
      {!isCollapsed && <Logo collapsed={false} />}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="h-7 w-7 shrink-0 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <PanelLeft className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
