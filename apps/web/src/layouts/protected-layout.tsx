import { Outlet, Navigate } from 'react-router-dom';

/**
 * Protected layout wrapper.
 * Once authentication is implemented, this will check auth state
 * and redirect unauthenticated users to /login.
 * For now, it always renders children.
 */
export function ProtectedLayout() {
  // TODO: Replace with actual auth check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
