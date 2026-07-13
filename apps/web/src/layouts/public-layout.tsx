import { Outlet } from 'react-router-dom';

/**
 * Public layout for unauthenticated routes (login, register, etc.)
 * No sidebar or navbar - full-screen centered content.
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        <Outlet />
      </div>
    </div>
  );
}
