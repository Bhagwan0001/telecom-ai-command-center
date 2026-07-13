import { Request, Response, NextFunction } from 'express';
import { NetworkService } from './network.service';
import { formatSuccessResponse } from '../../utils/response';

export class NetworkController {
  constructor(private networkService: NetworkService) {}

  public getTopology = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const topology = await this.networkService.getTopology();
      res.status(200).json(formatSuccessResponse(topology, 'Network topology retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const metrics = await this.networkService.getMetrics();
      res.status(200).json(formatSuccessResponse(metrics, 'Network metrics retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getIncidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const incidents = await this.networkService.getIncidents();
      res.status(200).json(formatSuccessResponse(incidents, 'Network incidents retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}
