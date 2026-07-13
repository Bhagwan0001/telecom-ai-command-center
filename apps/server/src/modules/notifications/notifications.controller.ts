import { Request, Response, NextFunction } from 'express';
import { NotificationsService } from './notifications.service';
import { formatSuccessResponse } from '../../utils/response';

export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const notifications = await this.notificationsService.listNotifications(userId);
      res.status(200).json(formatSuccessResponse(notifications, 'Notifications retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const success = await this.notificationsService.readNotification(req.params.id);
      res.status(200).json(formatSuccessResponse({ success }, 'Notification updated successfully'));
    } catch (error) {
      next(error);
    }
  };
}
