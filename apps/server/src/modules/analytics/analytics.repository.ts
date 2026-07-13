import { AnalyticsSummary } from './analytics.types';

export class AnalyticsRepository {
  async getAnalytics(): Promise<AnalyticsSummary> {
    const dates = ['Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11'];
    return {
      kpis: {
        latencyTrend: dates.map((date, index) => ({ date, value: 12 + Math.sin(index) * 3 })),
        throughputTrend: dates.map((date, index) => ({ date, value: 850 + index * 15 + Math.random() * 20 })),
        csatTrend: dates.map((date, index) => ({ date, value: 4.2 + (index * 0.1) })),
      },
      metricsSummary: {
        totalTickets: 1289,
        resolvedByAI: 1142,
        avgResolutionTimeMins: 4.8,
        savingsUsd: 14200,
      },
    };
  }
}
