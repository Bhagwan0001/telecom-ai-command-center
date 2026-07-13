import { NetworkTopology, NetworkMetric, NetworkIncident } from './network.types';

export class NetworkRepository {
  async getTopology(): Promise<NetworkTopology> {
    return {
      nodes: [
        { id: '1', type: 'custom', data: { label: 'Core Router West', status: 'healthy' }, position: { x: 250, y: 50 } },
        { id: '2', type: 'custom', data: { label: 'Regional Switch A', status: 'warning' }, position: { x: 100, y: 200 } },
        { id: '3', type: 'custom', data: { label: 'Regional Switch B', status: 'healthy' }, position: { x: 400, y: 200 } },
        { id: '4', type: 'custom', data: { label: 'Tower-North-Node4', status: 'error' }, position: { x: 50, y: 350 } },
        { id: '5', type: 'custom', data: { label: 'Tower-South-Node2', status: 'healthy' }, position: { x: 250, y: 350 } },
        { id: '6', type: 'custom', data: { label: 'Tower-East-Node1', status: 'healthy' }, position: { x: 450, y: 350 } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#ef4444' } },
        { id: 'e2-5', source: '2', target: '5' },
        { id: 'e3-6', source: '3', target: '6' },
      ],
    };
  }

  async getMetrics(): Promise<NetworkMetric[]> {
    const metrics: NetworkMetric[] = [];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      metrics.push({
        timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latency: Math.floor(10 + Math.random() * 8),
        packetLoss: parseFloat((Math.random() * 0.05).toFixed(3)),
        throughput: Math.floor(800 + Math.random() * 150),
      });
    }
    return metrics;
  }

  async getIncidents(): Promise<NetworkIncident[]> {
    return [
      { id: 'INC-4819', title: 'Cell Tower North Offline', node: 'Tower-North-Node4', severity: 'critical', status: 'Investigating', time: '4 mins ago' },
      { id: 'INC-4812', title: 'High Packet Loss Edge-SW-1', node: 'Edge-Switch-A', severity: 'high', status: 'Mitigating', time: '12 mins ago' },
      { id: 'INC-4799', title: 'Billing API Slow Response', node: 'Billing-Gateway-V3', severity: 'medium', status: 'Resolved', time: '1 hr ago' },
    ];
  }
}
