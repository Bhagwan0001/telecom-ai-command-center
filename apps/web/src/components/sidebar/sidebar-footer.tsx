import { useSidebarStore } from '@/store';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SidebarFooter() {
  const { isCollapsed } = useSidebarStore();

  const userContent = (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground cursor-pointer hover:bg-sidebar-accent transition-colors duration-150',
        isCollapsed && 'justify-center px-2'
      )}
    >
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarFallback className="bg-sidebar-primary/20 text-[11px] font-bold text-sidebar-primary">
          AD
        </AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-xs font-semibold text-sidebar-foreground">Admin User</span>
            <span className="truncate text-[10px] text-sidebar-muted">admin@taicc.com</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="border-t border-sidebar-border p-2 shrink-0">
      {isCollapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{userContent}</TooltipTrigger>
          <TooltipContent side="right">Admin User — admin@taicc.com</TooltipContent>
        </Tooltip>
      ) : (
        userContent
      )}
    </div>
  );
}
