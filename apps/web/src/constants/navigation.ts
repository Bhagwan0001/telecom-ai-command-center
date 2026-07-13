import {
  LayoutDashboard,
  Brain,
  Network,
  AlertTriangle,
  Bot,
  LifeBuoy,
  BarChart3,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const mainNavigation: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'AI Command Center',
        href: '/command-center',
        icon: Brain,
        badge: 'Core',
      },
    ],
  },
  {
    label: 'Operations & Support',
    items: [
      {
        title: 'Network Monitoring',
        href: '/network',
        icon: Network,
      },
      {
        title: 'Live Incident Center',
        href: '/incidents',
        icon: AlertTriangle,
        badge: 'Live',
      },
      {
        title: 'AI Agents',
        href: '/agents',
        icon: Bot,
      },
      {
        title: 'Customer Support',
        href: '/support',
        icon: LifeBuoy,
      },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
      },
      {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];
