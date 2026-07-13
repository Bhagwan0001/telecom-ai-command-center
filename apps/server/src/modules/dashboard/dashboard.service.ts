import { DashboardRepository } from './dashboard.repository';

export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}

  async getOverview() {
    return this.dashboardRepository.getOverview();
  }

  async getNetworkHealth() {
    return this.dashboardRepository.getNetworkHealth();
  }

  async getIncidents() {
    return this.dashboardRepository.getIncidents();
  }

  async getAnalytics() {
    return this.dashboardRepository.getAnalytics();
  }
}
