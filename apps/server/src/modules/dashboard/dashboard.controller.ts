import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './dashboard.service';
import { formatSuccessResponse } from '../../utils/response';

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  public getOverview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dashboardService.getOverview();
      res.status(200).json(formatSuccessResponse(data, 'Overview retrieved'));
    } catch (error) { next(error); }
  };

  public getNetworkHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dashboardService.getNetworkHealth();
      res.status(200).json(formatSuccessResponse(data, 'Network health retrieved'));
    } catch (error) { next(error); }
  };

  public getIncidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dashboardService.getIncidents();
      res.status(200).json(formatSuccessResponse(data, 'Incidents retrieved'));
    } catch (error) { next(error); }
  };

  public getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.dashboardService.getAnalytics();
      res.status(200).json(formatSuccessResponse(data, 'Analytics retrieved'));
    } catch (error) { next(error); }
  };
}
