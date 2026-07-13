import { Request, Response, NextFunction } from 'express';
import { AgentsService } from './agents.service';
import { formatSuccessResponse } from '../../utils/response';

export class AgentsController {
  constructor(private agentsService: AgentsService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const agents = await this.agentsService.listAgents();
      res.status(200).json(formatSuccessResponse(agents, 'AI agents retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}
