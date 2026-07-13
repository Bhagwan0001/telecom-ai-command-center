import { NetworkRepository } from './network.repository';
import { NetworkTopology, NetworkMetric, NetworkIncident } from './network.types';

export class NetworkService {
  constructor(private networkRepository: NetworkRepository) {}

  async getTopology(): Promise<NetworkTopology> {
    return this.networkRepository.getTopology();
  }

  async getMetrics(): Promise<NetworkMetric[]> {
    return this.networkRepository.getMetrics();
  }

  async getIncidents(): Promise<NetworkIncident[]> {
    return this.networkRepository.getIncidents();
  }
}
