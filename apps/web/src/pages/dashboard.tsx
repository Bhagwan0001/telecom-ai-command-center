import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Activity,
  Brain,
  Smile,
  Users,
  ArrowUpRight,
  TrendingUp,
  Server,
  type LucideIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useState, useEffect } from 'react';
import { dashboardApi } from '../lib/api';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface KpiCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  accent?: string;
}

function KpiCard({ title, value, change, isPositive, icon: Icon, accent = 'bg-primary/10 text-primary' }: KpiCardProps) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border bg-card p-5 shadow-card cursor-default"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            isPositive ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          <TrendingUp className="h-3 w-3" />
          {change}
        </span>
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  const [data, setData] = useState<any>({
    overview: null,
    networkHealth: [],
    incidents: [],
    analytics: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [overview, networkHealth, incidents, analytics] = await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getNetworkHealth(),
          dashboardApi.getIncidents(),
          dashboardApi.getAnalytics(),
        ]);
        setData({ overview, networkHealth, incidents, analytics });
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-muted-foreground animate-pulse">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="flex h-[50vh] items-center justify-center text-red-500">Error: {error}</div>;
  }

  // Map API data to UI structures
  const liveNetworkData = data.networkHealth.slice(0, 10).map((n: any, idx: number) => ({
    time: `Node ${idx + 1}`,
    load: n.metrics?.find((m: any) => m.type === 'CPU_USAGE')?.value || 0,
    latency: n.metrics?.find((m: any) => m.type === 'LATENCY')?.value || 0,
  }));

  const incidentsBySeverity = data.incidents.reduce((acc: any, inc: any) => {
    acc[inc.severity] = (acc[inc.severity] || 0) + 1;
    return acc;
  }, {});
  const customerSatData = Object.keys(incidentsBySeverity).map((key) => ({
    name: key,
    value: incidentsBySeverity[key],
  }));

  const recentAiDecisions = data.incidents.slice(0, 5).map((inc: any, idx: number) => ({
    id: inc.id,
    agent: inc.title,
    action: inc.description,
    time: new Date(inc.createdAt).toLocaleDateString(),
    color: idx % 2 === 0 ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500',
  }));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Command Center Hub</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Deutsche Telekom Digital Labs — Real-time operations overview
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          All core systems operational
        </motion.div>
      </motion.div>

      {/* KPI Cards Row 1 */}
      <motion.div variants={container} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Active Incidents" value={data.overview?.criticalIncidents || 0} change="Live" isPositive={true} icon={AlertTriangle} accent="bg-amber-500/10 text-amber-500" />
        <KpiCard title="Active Nodes" value={data.overview?.activeNodes || 0} change="Live" isPositive={true} icon={Activity} accent="bg-blue-500/10 text-blue-500" />
        <KpiCard title="Total Customers" value={data.overview?.totalCustomers || 0} change="Live" isPositive={true} icon={Users} accent="bg-primary/10 text-primary" />
        <KpiCard title="Open Tickets" value={data.overview?.openTickets || 0} change="Live" isPositive={true} icon={Smile} accent="bg-emerald-500/10 text-emerald-500" />
      </motion.div>

      {/* KPI Cards Row 2 */}
      <motion.div variants={container} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.analytics.slice(0, 4).map((metric: any, idx: number) => (
          <KpiCard key={metric.id || idx} title={metric.name} value={metric.value} change={metric.category} isPositive={true} icon={Server} accent="bg-emerald-500/10 text-emerald-500" />
        ))}
      </motion.div>

      {/* Charts & Logs */}
      <motion.div variants={container} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Network Load Chart */}
        <motion.div
          variants={item}
          whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          className="rounded-xl border bg-card p-6 shadow-card lg:col-span-2 transition-shadow"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Network Load & Latency</h3>
              <p className="text-xs text-muted-foreground">Real-time polling every 60s</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Activity className="h-3.5 w-3.5 animate-pulse" /> Live
            </span>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liveNetworkData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Line type="monotone" dataKey="load" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Load (%)" />
                <Line type="monotone" dataKey="latency" stroke="#ef4444" strokeWidth={2} dot={false} name="Latency (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CSAT Pie Chart */}
        <motion.div
          variants={item}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <h3 className="mb-4 text-sm font-semibold">Incidents by Severity</h3>
          <div className="flex h-[180px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSatData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {customerSatData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {customerSatData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
                <span className="font-semibold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Decision Log */}
        <motion.div
          variants={item}
          className="rounded-xl border bg-card p-6 shadow-card lg:col-span-3"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Incidents</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              View full log <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentAiDecisions.map((decision: any) => (
              <motion.div
                key={decision.id}
                whileHover={{ x: 2 }}
                className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3 text-xs transition-colors hover:bg-muted/50"
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${decision.color}`}>
                  <Brain className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{decision.agent}</span>
                    <span className="shrink-0 text-muted-foreground">{decision.time}</span>
                  </div>
                  <p className="text-muted-foreground">{decision.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
