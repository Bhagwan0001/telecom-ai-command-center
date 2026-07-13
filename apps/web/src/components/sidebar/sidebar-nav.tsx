import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store';
import { mainNavigation } from '@/constants/navigation';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SidebarNav() {
  const { pathname } = useLocation();
  const { isCollapsed } = useSidebarStore();

  return (
    <ScrollArea className="flex-1 py-3">
      <div className="flex flex-col gap-0.5 px-2">
        {mainNavigation.map((group) => (
          <div key={group.label} className="mb-3">
            {!isCollapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                {group.label}
              </p>
            )}
            {isCollapsed && (
              <div className="mb-2 mx-auto h-px w-6 bg-sidebar-border opacity-50" />
            )}

            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              const linkContent = (
                <Link
                  to={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-sidebar-primary/15 text-sidebar-primary shadow-sm'
                      : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground',
                    isCollapsed && 'justify-center px-2'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors duration-150',
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-muted group-hover:text-sidebar-foreground'
                    )}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            'inline-flex h-4 items-center rounded px-1.5 text-[9px] font-bold uppercase tracking-wider',
                            item.badge === 'Live'
                              ? 'bg-red-500/20 text-red-400 animate-pulse'
                              : 'bg-sidebar-primary/20 text-sidebar-primary'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      {item.title}
                      {item.badge && (
                        <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                          {item.badge}
                        </Badge>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{linkContent}</div>;
            })}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
