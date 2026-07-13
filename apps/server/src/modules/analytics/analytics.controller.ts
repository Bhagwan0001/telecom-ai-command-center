import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from './analytics.service';
import { formatSuccessResponse } from '../../utils/response';

export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  public getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await this.analyticsService.getAnalyticsSummary();
      res.status(200).json(formatSuccessResponse(summary, 'Analytics summary retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}
