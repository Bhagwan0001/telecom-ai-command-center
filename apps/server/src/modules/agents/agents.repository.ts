import { AgentInfo } from './agents.types';

export class AgentsRepository {
  async getAgents(): Promise<AgentInfo[]> {
    return [
      {
        id: 'incident_triage',
        name: 'Incident Triage Agent',
        role: 'Triage Specialist',
        status: 'online',
        description: 'Analyzes incoming node faults, detects severity, and identifies affected services.',
        capabilities: ['Root cause suggestion', 'Impact assessment', 'Automation triggers'],
        lastActive: 'Just now',
      },
      {
        id: 'network_monitoring',
        name: 'Network Monitoring Agent',
        role: 'Telemetry Specialist',
        status: 'online',
        description: 'Monitors KPIs in real-time, predicts node failures, and detects traffic anomalies.',
        capabilities: ['Outage predictions', 'Threshold analysis', 'Subnet monitoring'],
        lastActive: '2 mins ago',
      },
      {
        id: 'billing_intelligence',
        name: 'Billing Intelligence Agent',
        role: 'Audit Specialist',
        status: 'online',
        description: 'Audits transaction flow, detects billing anomalies, and reconciles invoice disputes.',
        capabilities: ['Anomalous roaming charge detection', 'Invoice audit', 'Credits allocation'],
        lastActive: '5 mins ago',
      },
      {
        id: 'customer_support',
        name: 'Customer Support Agent',
        role: 'Customer Care Specialist',
        status: 'busy',
        description: 'Autonomously responds to customer inquiries, queries billing status, and escalates to engineering.',
        capabilities: ['Natural language answers', 'Account validation', 'Human support handoff'],
        lastActive: 'Just now',
      },
      {
        id: 'executive_copilot',
        name: 'Executive Copilot Agent',
        role: 'Strategic Planner',
        status: 'online',
        description: 'Synthesizes operation telemetry and network health logs into structured executive briefs.',
        capabilities: ['Briefing summaries', 'Strategic recommendations', 'Q3 planning metrics'],
        lastActive: '1 hr ago',
      },
    ];
  }
}
