import { Request, Response, NextFunction } from 'express';
import { AuditService } from './audit.service';
import { formatSuccessResponse } from '../../utils/response';

export class AuditController {
  constructor(private auditService: AuditService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.query.userId as string | undefined;
      const logs = await this.auditService.getLogs(userId);
      res.status(200).json(formatSuccessResponse(logs, 'Audit logs retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const log = await this.auditService.getLogById(req.params.id);
      res.status(200).json(formatSuccessResponse(log, 'Audit log details retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}
