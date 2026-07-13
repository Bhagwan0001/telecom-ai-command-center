import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsSummary } from './analytics.types';

export class AnalyticsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    return this.analyticsRepository.getAnalytics();
  }
}
