import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Shield, Send, Terminal, Settings2, Play, Pause, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { aiApi } from '../lib/api';

const agentStatus = [
  { name: 'Supervisor Agent', status: 'Active', tasks: 'Orchestrating child agents', load: '14%', color: 'text-emerald-500 bg-emerald-500/10', icon: Brain },
  { name: 'Billing Intelligence Agent', status: 'Active', tasks: 'Auditing high value invoices', load: '8%', color: 'text-blue-500 bg-blue-500/10', icon: Cpu },
  { name: 'Network Operations Agent', status: 'Monitoring', tasks: 'Analyzing node latency spikes', load: '32%', color: 'text-amber-500 bg-amber-500/10', icon: Zap },
  { name: 'Fraud Sentinel Agent', status: 'Active', tasks: 'Scanning SIM Swap requests', load: '5%', color: 'text-emerald-500 bg-emerald-500/10', icon: Shield },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function CommandCenterPage() {
  const [autonomousMode, setAutonomousMode] = useState(true);
  const [promptInput, setPromptInput] = useState('');
  const [logs, setLogs] = useState([
    'System: Initiating Multi-Agent Telephony supervisor framework...',
    'Supervisor Agent: Handshaking with Billing & Network sub-agents... OK',
    'Network Ops Agent: Flagged Node-12 latency deviation. Analyzing...',
    'Supervisor Agent: Routing investigation to Network Ops Agent.',
    'Network Ops Agent: Rerouted sub-packets, load normalized. Latency reduced to 18ms.',
  ]);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = promptInput.trim();
    if (!prompt) return;

    setLogs((prev) => [
      ...prev,
      `User: ${prompt}`,
      `Supervisor Agent: Analyzing directive via LLM reasoning path...`,
    ]);
    setPromptInput('');

    try {
      const response = await aiApi.chat(prompt);
      setLogs((prev) => [
        ...prev,
        `Supervisor Agent: ${response.summary}`,
        `Supervisor Agent [Root Cause]: ${response.rootCause}`,
        `Supervisor Agent [Recommendations]: ${response.recommendations?.join(', ') || 'None'}`,
        `Supervisor Agent [Telemetry]: Priority=${response.priority}, Confidence=${response.confidenceScore}%`,
      ]);
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        `System Error: Failed to contact Supervisor Agent. (${err.message || 'Unknown'})`,
      ]);
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Command Center</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Multi-Agent Supervisor hub & operational playground</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-card">
          <span className="text-xs font-medium text-muted-foreground">Copilot Mode</span>
          <Button
            size="sm"
            variant={autonomousMode ? 'default' : 'outline'}
            className="h-7 gap-1.5 text-xs"
            onClick={() => setAutonomousMode(!autonomousMode)}
          >
            {autonomousMode ? (
              <><Play className="h-3 w-3 fill-current" /> Fully Autonomous</>
            ) : (
              <><Pause className="h-3 w-3" /> Human-in-Loop</>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Agents + Terminal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Agent Cards */}
          <motion.div variants={container} className="grid gap-4 sm:grid-cols-2">
            {agentStatus.map((agent) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.name}
                  variants={item}
                  whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                  className="rounded-xl border bg-card p-5 space-y-3 shadow-card transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', agent.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold leading-tight">{agent.name}</h4>
                        <span className="text-[10px] text-muted-foreground">Load: {agent.load}</span>
                      </div>
                    </div>
                    <span className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      agent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    )}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')} />
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground border-t pt-3">{agent.tasks}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Terminal Console */}
          <motion.div
            variants={item}
            className="rounded-xl border border-zinc-800 bg-zinc-950 dark:bg-zinc-950 p-5 font-mono text-xs shadow-inner flex-1 min-h-[260px] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <Terminal className="h-3.5 w-3.5 text-zinc-400 ml-1" />
                <span className="text-zinc-300 font-semibold">Agent Reasoning Trail</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[220px] pr-1">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2 text-zinc-400"
                >
                  <span className="text-zinc-600 select-none shrink-0">›</span>
                  <span className={log.startsWith('User:') ? 'text-blue-400' : log.includes('Supervisor') ? 'text-zinc-200' : 'text-zinc-400'}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSendPrompt} className="flex gap-2 border-t border-zinc-800 pt-3 mt-3">
              <Input
                type="text"
                placeholder="Instruct the supervisor agent..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="flex-1 h-8 bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-xs focus-visible:ring-primary/50"
              />
              <Button type="submit" size="sm" className="h-8 gap-1.5 text-xs">
                <Send className="h-3 w-3" /> Send
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Right: Settings Panel */}
        <motion.div variants={item} className="rounded-xl border bg-card p-5 shadow-card space-y-5">
          <div className="flex items-center gap-2 border-b pb-3">
            <Settings2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Agent Guardrail Settings</h3>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Model Engine
              </span>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 h-8 gap-1.5 text-xs">
                  <Cpu className="h-3.5 w-3.5" /> Gemini Pro
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
                  GPT-4o
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Safety & Audit Policy
              </span>
              <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
                {[
                  { label: 'Auto-approve network fixes', icon: Shield, color: 'text-emerald-500' },
                  { label: 'Human validation for Billing', icon: Shield, color: 'text-amber-500' },
                ].map((policy) => {
                  const Icon = policy.icon;
                  return (
                    <div key={policy.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className={cn('h-3.5 w-3.5', policy.color)} />
                        {policy.label}
                      </span>
                      <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-primary cursor-pointer" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Max Autonomous Decisions / Hour
              </span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-primary transition-all" />
                </div>
                <span className="text-sm font-bold text-foreground">60</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
