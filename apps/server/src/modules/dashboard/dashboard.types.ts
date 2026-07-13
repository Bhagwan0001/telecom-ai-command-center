export interface DashboardAlert {
  id: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  time: string;
}

export interface AgentStatus {
  name: string;
  status: 'online' | 'busy' | 'offline';
  activeTasks: number;
}

export interface DashboardData {
  activeTowers: number;
  criticalIncidents: number;
  networkHealth: number;
  latency: number;
  packetLoss: number;
  cpu: number;
  memory: number;
  alerts: DashboardAlert[];
  agentsStatus: AgentStatus[];
}
