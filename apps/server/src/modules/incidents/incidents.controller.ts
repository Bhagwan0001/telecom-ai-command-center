import { Request, Response, NextFunction } from 'express';
import { IncidentsService } from './incidents.service';
import { formatSuccessResponse } from '../../utils/response';

export class IncidentsController {
  constructor(private incidentsService: IncidentsService) {}

  public getIncidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const incidents = await this.incidentsService.getIncidents();
      res.status(200).json(formatSuccessResponse(incidents, 'Incidents retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const incident = await this.incidentsService.getIncidentById(req.params.id);
      res.status(200).json(formatSuccessResponse(incident, 'Incident details retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const incident = await this.incidentsService.createIncident(req.body);
      res.status(201).json(formatSuccessResponse(incident, 'Incident reported successfully'));
    } catch (error) {
      next(error);
    }
  };
}
