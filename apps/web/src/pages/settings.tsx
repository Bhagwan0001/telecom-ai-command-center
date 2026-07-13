import { motion } from 'framer-motion';
import { Settings2, Bell, Shield, Key, User, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">System Settings</h2>
          <p className="text-sm text-muted-foreground">
            Configure workspace preferences, security policies, and integrations
          </p>
        </div>
        <Button className="gap-2">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Settings Navigation Sidebar */}
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary transition-colors">
            <User className="h-4 w-4" /> Account Profile
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Shield className="h-4 w-4" /> Security & Auth
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Settings2 className="h-4 w-4" /> Workspace Preferences
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Globe className="h-4 w-4" /> Integrations (APIs)
          </button>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Database className="h-4 w-4" /> Data Retention
          </button>
        </div>

        {/* Settings Form Content */}
        <div className="md:col-span-3 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Profile Information</h3>
              <p className="text-sm text-muted-foreground mt-1">Update your account details and public identity.</p>
            </div>
            
            <div className="space-y-4 max-w-xl">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input defaultValue="Admin Supervisor" className="bg-zinc-950/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input defaultValue="admin@telecom-ai.local" className="bg-zinc-950/50" disabled />
                <p className="text-[10px] text-muted-foreground">To change your email address, contact the IT department.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role / Title</label>
                <Input defaultValue="Chief Operations Officer" className="bg-zinc-950/50" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage programmatic access to the Command Center.</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <Key className="h-3.5 w-3.5" /> Generate New Key
              </Button>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">Production API Key</div>
                <div className="text-xs text-muted-foreground mt-0.5">Created on Oct 10, 2026 • Last used 2 hours ago</div>
              </div>
              <span className="font-mono text-xs bg-zinc-950 px-3 py-1.5 rounded-md border text-zinc-400">
                taicc_live_*******************8f2a
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
