export interface Incident {
  id: string;
  title: string;
  node: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'Investigating' | 'Mitigating' | 'Resolved';
  assignedTo?: string;
  time: string;
}
