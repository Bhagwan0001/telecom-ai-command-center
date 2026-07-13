import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, ChevronRight, Play, Cpu, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  node: string;
  assignedTo: string;
  status: 'Investigating' | 'Mitigating' | 'Resolved';
  time: string;
  description: string;
  aiRecommendation: string;
}

const mockIncidents: Incident[] = [
  {
    id: 'INC-4819',
    title: 'Cell Tower North Offline',
    severity: 'critical',
    node: 'Tower-North-Node4',
    assignedTo: 'Marcus K.',
    status: 'Investigating',
    time: '4 mins ago',
    description: 'Antenna power drop detected. Backup power failed to kick in immediately after main grid fluctuation.',
    aiRecommendation: 'Activate backup sub-grid line 3B and dispatch localized field technician to verify backplane switch connectivity.',
  },
  {
    id: 'INC-4812',
    title: 'High Packet Loss Edge-SW-1',
    severity: 'high',
    node: 'Edge-Switch-A',
    assignedTo: 'Sarah T.',
    status: 'Mitigating',
    time: '12 mins ago',
    description: 'Edge switch experiencing memory leak / buffer depletion under peak evening volume.',
    aiRecommendation: 'Flush sub-routing cache nodes & provision load-balancer reallocation to Edge Switch B.',
  },
  {
    id: 'INC-4799',
    title: 'Billing API Slow Response',
    severity: 'medium',
    node: 'Billing-Gateway-V3',
    assignedTo: 'Alex D.',
    status: 'Resolved',
    time: '1 hr ago',
    description: 'Postgres sequence bottleneck during query transaction executions on billing microservice.',
    aiRecommendation: 'Optimize database index pools or temporarily scale connection pool size.',
  },
];

const severityConfig: Record<Incident['severity'], { classes: string; label: string }> = {
  critical: { classes: 'bg-red-500/10 text-red-500 border-red-500/30', label: 'Critical' },
  high: { classes: 'bg-amber-500/10 text-amber-500 border-amber-500/30', label: 'High' },
  medium: { classes: 'bg-blue-500/10 text-blue-500 border-blue-500/30', label: 'Medium' },
  low: { classes: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/30', label: 'Low' },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function IncidentCenterPage() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0] ?? null);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  const filteredIncidents = incidents.filter((inc) => filter === 'all' || inc.severity === filter);

  const handleApplyMitigation = (id: string) => {
    const update = (inc: Incident) =>
      inc.id === id
        ? { ...inc, status: 'Resolved' as const, aiRecommendation: 'Mitigation applied. System backplane restored and confirmed.' }
        : inc;
    setIncidents((prev) => prev.map(update));
    setSelectedIncident((prev) => (prev?.id === id ? update(prev) : prev));
  };

  const filterOptions: { value: typeof filter; label: string; count?: number }[] = [
    { value: 'all', label: 'All Incidents', count: incidents.length },
    { value: 'critical', label: 'Critical', count: incidents.filter(i => i.severity === 'critical').length },
    { value: 'high', label: 'High', count: incidents.filter(i => i.severity === 'high').length },
    { value: 'medium', label: 'Medium', count: incidents.filter(i => i.severity === 'medium').length },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Incident Center</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage outages and AI-assisted mitigation workflows</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/8 px-3 py-1.5 text-xs font-semibold text-red-500">
          <AlertCircle className="h-3.5 w-3.5 animate-pulse" />
          {incidents.filter(i => i.status !== 'Resolved').length} Active Incidents
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={item} className="flex gap-2 border-b pb-3">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              filter === opt.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <span className="capitalize">{opt.label}</span>
            {opt.count !== undefined && (
              <span className={cn(
                'inline-flex h-4 min-w-[1rem] items-center justify-center rounded px-1 text-[10px] font-bold',
                filter === opt.value ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted-foreground/20'
              )}>
                {opt.count}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Incident Queue */}
        <motion.div variants={container} className="lg:col-span-2 space-y-3">
          {filteredIncidents.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground shadow-card">
              No incidents match the active filter.
            </div>
          ) : (
            filteredIncidents.map((incident) => {
              const sev = severityConfig[incident.severity];
              return (
                <motion.div
                  key={incident.id}
                  variants={item}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelectedIncident(incident)}
                  className={cn(
                    'group flex items-center justify-between rounded-xl border bg-card p-4 shadow-card cursor-pointer transition-all duration-150',
                    'hover:border-primary/30 hover:shadow-card-hover',
                    selectedIncident?.id === incident.id && 'border-primary/50 ring-1 ring-primary/20 bg-primary/[0.02]'
                  )}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={cn('shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider', sev.classes)}>
                      {sev.label}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold truncate">{incident.title}</h4>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{incident.node}</span>
                        <span>·</span>
                        <span>{incident.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      'hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      incident.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    )}>
                      {incident.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* AI Mitigation Panel */}
        <motion.div variants={item}>
          {selectedIncident ? (
            <div className="rounded-xl border bg-card p-5 shadow-card space-y-5 sticky top-20">
              <div className="space-y-1 border-b pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{selectedIncident.id}</span>
                <h3 className="text-sm font-semibold">{selectedIncident.title}</h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{selectedIncident.description}</p>

              <div className="rounded-lg border border-primary/15 bg-primary/5 p-4 space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Cpu className="h-3.5 w-3.5" /> AI Suggested Mitigation
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedIncident.aiRecommendation}</p>
              </div>

              <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Assigned Engineer
                </span>
                <span className="font-semibold">{selectedIncident.assignedTo}</span>
              </div>

              {selectedIncident.status !== 'Resolved' ? (
                <Button
                  onClick={() => handleApplyMitigation(selectedIncident.id)}
                  className="w-full gap-1.5 text-xs"
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Apply Autonomous Fix
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-500">
                  <ShieldCheck className="h-4 w-4" /> Incident Resolved
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
              Select an incident to investigate
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
