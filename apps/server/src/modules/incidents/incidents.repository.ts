import { Incident } from './incidents.types';

export class IncidentsRepository {
  private incidents: Incident[] = [
    { id: 'INC-4819', title: 'Cell Tower North Offline', node: 'Tower-North-Node4', severity: 'critical', status: 'Investigating', time: '4 mins ago' },
    { id: 'INC-4812', title: 'High Packet Loss Edge-SW-1', node: 'Edge-Switch-A', severity: 'high', status: 'Mitigating', time: '12 mins ago' },
    { id: 'INC-4799', title: 'Billing API Slow Response', node: 'Billing-Gateway-V3', severity: 'medium', status: 'Resolved', time: '1 hr ago' },
  ];

  async getIncidents(): Promise<Incident[]> {
    return this.incidents;
  }

  async getIncidentById(id: string): Promise<Incident | null> {
    return this.incidents.find(inc => inc.id === id) || null;
  }

  async create(data: Omit<Incident, 'id' | 'status' | 'time'>): Promise<Incident> {
    const newInc: Incident = {
      ...data,
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Investigating',
      time: 'Just now',
    };
    this.incidents.unshift(newInc);
    return newInc;
  }
}
