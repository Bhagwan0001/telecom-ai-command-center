import { Navigate, type RouteObject } from 'react-router-dom';
import { RootLayout } from '@/layouts/root-layout';
import { ProtectedLayout } from '@/layouts/protected-layout';
import { PublicLayout } from '@/layouts/public-layout';
import { DashboardPage } from '@/pages/dashboard';
import { CommandCenterPage } from '@/pages/command-center';
import { NetworkMonitoringPage } from '@/pages/network';
import { IncidentCenterPage } from '@/pages/incidents';
import { AgentsPage } from '@/pages/agents';
import { SupportPage } from '@/pages/support';
import { AnalyticsPage } from '@/pages/analytics';
import { ReportsPage } from '@/pages/reports';
import { SettingsPage } from '@/pages/settings';
import { LoginPage } from '@/pages/login';
import { NotFoundPage } from '@/pages/not-found';

export const routes: RouteObject[] = [
  // Protected routes (with sidebar + navbar)
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'command-center', element: <CommandCenterPage /> },
          { path: 'network', element: <NetworkMonitoringPage /> },
          { path: 'incidents', element: <IncidentCenterPage /> },
          { path: 'agents', element: <AgentsPage /> },
          { path: 'support', element: <SupportPage /> },
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
  // Public routes (no sidebar)
  {
    element: <PublicLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
    ],
  },
];
