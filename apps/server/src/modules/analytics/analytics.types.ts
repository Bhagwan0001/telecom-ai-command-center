export interface AnalyticsKpiTrend {
  date: string;
  value: number;
}

export interface AnalyticsSummary {
  kpis: {
    latencyTrend: AnalyticsKpiTrend[];
    throughputTrend: AnalyticsKpiTrend[];
    csatTrend: AnalyticsKpiTrend[];
  };
  metricsSummary: {
    totalTickets: number;
    resolvedByAI: number;
    avgResolutionTimeMins: number;
    savingsUsd: number;
  };
}
