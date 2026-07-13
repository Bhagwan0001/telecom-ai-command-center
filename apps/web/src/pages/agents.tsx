import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline';
  model: string;
  runsToday: number;
  accuracy: string;
  capabilities: string[];
}

const mockAgents: Agent[] = [
  {
    id: 'AGT-01',
    name: 'Network Supervisor Agent',
    role: 'Root Supervisor',
    status: 'online',
    model: 'Gemini 1.5 Pro',
    runsToday: 842,
    accuracy: '99.8%',
    capabilities: ['Task routing', 'Safety guardrails', 'Multi-agent orchestration'],
  },
  {
    id: 'AGT-02',
    name: 'Billing Audit Sentinel',
    role: 'Billing Auditor',
    status: 'online',
    model: 'Gemini 1.5 Flash',
    runsToday: 412,
    accuracy: '98.5%',
    capabilities: ['Invoice audit', 'Chargeback checks', 'Contract mismatches'],
  },
  {
    id: 'AGT-03',
    name: 'Incident Response Agent',
    role: 'Outage Mitigator',
    status: 'online',
    model: 'GPT-4o',
    runsToday: 180,
    accuracy: '99.1%',
    capabilities: ['Traffic rerouting', 'Node checks', 'Tower failure audits'],
  },
  {
    id: 'AGT-04',
    name: 'Customer Support AI',
    role: 'Tier 1 Responder',
    status: 'offline',
    model: 'GPT-3.5 Turbo',
    runsToday: 0,
    accuracy: '94.2%',
    capabilities: ['Text synthesis', 'Complaint logging', 'API mock trigger'],
  },
];

export function AgentsPage() {
  const [agents, setAgents] = useState(mockAgents);

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((agt) =>
        agt.id === id
          ? {
              ...agt,
              status: agt.status === 'online' ? ('offline' as const) : ('online' as const),
            }
          : agt
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">AI Agents</h2>
          <p className="text-sm text-muted-foreground">
            Manage autonomous workspace agents and monitor reasoning logs
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between space-y-6 transition-all ${
              agent.status === 'offline' ? 'opacity-60' : ''
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{agent.name}</h4>
                    <span className="text-[10px] text-muted-foreground">{agent.role}</span>
                  </div>
                </div>

                <button onClick={() => toggleAgent(agent.id)} className="focus:outline-none">
                  {agent.status === 'online' ? (
                    <ToggleRight className="h-7 w-7 text-primary" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs border-y py-3">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Engine</span>
                  <span className="font-semibold">{agent.model}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">Accuracy</span>
                  <span className="font-semibold">{agent.accuracy}</span>
                </div>
              </div>

              {/* Capabilities */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-4 border-t">
              <span className="text-muted-foreground">Runs Today: <strong className="text-foreground">{agent.runsToday}</strong></span>
              {agent.status === 'online' && (
                <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
