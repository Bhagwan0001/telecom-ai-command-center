import { IncidentsRepository } from './incidents.repository';
import { Incident } from './incidents.types';

export class IncidentsService {
  constructor(private incidentsRepository: IncidentsRepository) {}

  async getIncidents(): Promise<Incident[]> {
    return this.incidentsRepository.getIncidents();
  }

  async getIncidentById(id: string): Promise<Incident | null> {
    return this.incidentsRepository.getIncidentById(id);
  }

  async createIncident(data: Omit<Incident, 'id' | 'status' | 'time'>): Promise<Incident> {
    return this.incidentsRepository.create(data);
  }
}
