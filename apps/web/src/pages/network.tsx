import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Signal, Shield, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

// React Flow Initial State
const initialNodes: Node[] = [
  {
    id: 'core-dc',
    position: { x: 250, y: 50 },
    data: { label: '🏢 Main Data Center (Active)' },
    style: { background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'edge-sw-1',
    position: { x: 100, y: 150 },
    data: { label: '⚙️ Regional Edge Switch A' },
    style: { background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'edge-sw-2',
    position: { x: 400, y: 150 },
    data: { label: '⚙️ Regional Edge Switch B' },
    style: { background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'tower-1',
    position: { x: 50, y: 280 },
    data: { label: '📡 Cell Tower North' },
    style: { background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'tower-2',
    position: { x: 180, y: 280 },
    data: { label: '📡 Cell Tower West' },
    style: { background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' },
  },
  {
    id: 'tower-3',
    position: { x: 400, y: 280 },
    data: { label: '📡 Cell Tower East' },
    style: { background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-dc-sw1', source: 'core-dc', target: 'edge-sw-1', animated: true },
  { id: 'e-dc-sw2', source: 'core-dc', target: 'edge-sw-2', animated: true },
  { id: 'e-sw1-t1', source: 'edge-sw-1', target: 'tower-1', label: 'High Latency', style: { stroke: '#ef4444' } },
  { id: 'e-sw1-t2', source: 'edge-sw-1', target: 'tower-2', animated: true },
  { id: 'e-sw2-t3', source: 'edge-sw-2', target: 'tower-3', animated: true },
];

const metrics = [
  { title: 'Tower Status', value: '41 / 42 Active', color: 'text-amber-500' },
  { title: 'Signal Health', value: '98.4% Quality', color: 'text-emerald-500' },
  { title: 'Fiber Links', value: '18 / 18 Up', color: 'text-emerald-500' },
  { title: 'Regional Uptime', value: '99.98% avg', color: 'text-emerald-500' },
];

export function NetworkMonitoringPage() {
  const [nodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Network Monitoring</h2>
          <p className="text-sm text-muted-foreground">
            Realtime regional network topology mapping & tower status
          </p>
        </div>
      </div>

      {/* Network Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.title} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground">{m.title}</div>
            <div className={`mt-2 text-2xl font-bold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Topology Canvas and Side Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Topology Visualization Map */}
        <div className="lg:col-span-2 rounded-xl border bg-card/50 overflow-hidden flex flex-col h-[520px] shadow-sm">
          <div className="flex items-center justify-between border-b bg-card px-4 py-3">
            <span className="text-sm font-semibold flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-primary animate-pulse" /> Regional Topology Map
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5" /> Hold Ctrl + Scroll to zoom
            </span>
          </div>

          <div className="flex-1 w-full relative">
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Background color="#ccc" gap={16} />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </div>

        {/* Live Device/Status Panel */}
        <div className="flex flex-col gap-6">
          {/* Active alerts */}
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-1.5 text-red-500">
              <AlertTriangle className="h-4 w-4" /> Live Incidents Alert
            </h3>
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 space-y-2 text-xs text-red-600 dark:text-red-400">
              <div className="font-semibold flex items-center gap-1">
                <Signal className="h-3.5 w-3.5" /> Cell Tower North down
              </div>
              <p className="text-muted-foreground text-[11px]">
                Failure triggered in Node Sub-Section 4a. Backplane interface mismatch flagged.
              </p>
            </div>
          </div>

          {/* Infrastructure Health details */}
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4 flex-1">
            <h3 className="text-sm font-semibold">Infrastructure Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5" /> Main Core Latency
                </span>
                <span className="font-semibold">12 ms</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" /> Packet Drop Rate
                </span>
                <span className="font-semibold">0.002%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5" /> Network Capacity
                </span>
                <span className="font-semibold">74% / 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
