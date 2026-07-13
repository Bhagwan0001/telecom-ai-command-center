import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const paths = pathname.split('/').filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground mb-4">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {paths.map((path, idx) => {
        const to = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === paths.length - 1;
        const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');

        return (
          <div key={to} className="flex items-center space-x-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            {isLast ? (
              <span className="font-medium text-foreground capitalize">{displayName}</span>
            ) : (
              <Link to={to} className="hover:text-foreground transition-colors capitalize">
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
