import { NotificationsRepository } from './notifications.repository';
import { Notification } from './notifications.types';

export class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async listNotifications(userId: string): Promise<Notification[]> {
    return this.notificationsRepository.getNotifications(userId);
  }

  async sendNotification(data: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): Promise<Notification> {
    return this.notificationsRepository.create(data);
  }

  async readNotification(id: string): Promise<boolean> {
    return this.notificationsRepository.markAsRead(id);
  }
}
