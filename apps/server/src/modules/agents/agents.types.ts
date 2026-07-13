export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  description: string;
  capabilities: string[];
  lastActive: string;
}
