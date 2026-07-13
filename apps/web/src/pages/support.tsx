import { useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, Search, Clock, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockTickets = [
  { id: 'TCK-9901', customer: 'Alice Johnson', issue: 'Billing discrepancy on October invoice', status: 'Open', priority: 'High', time: '10 mins ago', aiHandled: true },
  { id: 'TCK-9892', customer: 'Bob Smith', issue: 'Fiber connection dropping intermittently', status: 'In Progress', priority: 'Medium', time: '45 mins ago', aiHandled: false },
  { id: 'TCK-9884', customer: 'Corp Network Solutions', issue: 'New dedicated IP allocation request', status: 'Resolved', priority: 'Low', time: '2 hours ago', aiHandled: true },
  { id: 'TCK-9877', customer: 'Diana Prince', issue: 'SIM swap authorization pending', status: 'Open', priority: 'Critical', time: '3 hours ago', aiHandled: false },
];

export function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Customer Support</h2>
          <p className="text-sm text-muted-foreground">
            Manage customer inquiries and oversee AI support agent resolutions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Auto-Resolve Settings
          </Button>
          <Button className="gap-2">
            <LifeBuoy className="h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* KPI Cards */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Open Tickets</div>
          <div className="mt-2 text-3xl font-bold">124</div>
          <div className="mt-1 text-xs text-red-500 font-medium">+12 since yesterday</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">AI Resolution Rate</div>
          <div className="mt-2 text-3xl font-bold text-primary">68%</div>
          <div className="mt-1 text-xs text-emerald-500 font-medium">+5% this week</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Avg Response Time</div>
          <div className="mt-2 text-3xl font-bold">1.2m</div>
          <div className="mt-1 text-xs text-emerald-500 font-medium">-30s with AI Agent</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">CSAT Score</div>
          <div className="mt-2 text-3xl font-bold">4.8</div>
          <div className="mt-1 text-xs text-emerald-500 font-medium">Top 10% Industry</div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="rounded-xl border bg-card shadow-sm flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Recent Tickets</h3>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tickets..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Ticket ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">AI Assisted</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{ticket.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                        <User className="h-3 w-3" />
                      </div>
                      {ticket.customer}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">{ticket.issue}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      ticket.status === 'Open' ? 'bg-amber-500/10 text-amber-500' :
                      ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {ticket.status === 'Resolved' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold uppercase ${
                      ticket.priority === 'Critical' ? 'text-red-500' :
                      ticket.priority === 'High' ? 'text-amber-500' :
                      ticket.priority === 'Medium' ? 'text-blue-500' : 'text-muted-foreground'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {ticket.aiHandled ? (
                      <span className="flex items-center gap-1 text-primary text-xs font-medium">
                        <Sparkles className="h-3.5 w-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{ticket.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
