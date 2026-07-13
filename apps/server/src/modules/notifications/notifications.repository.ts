import { Notification } from './notifications.types';

export class NotificationsRepository {
  private notifications: Notification[] = [];

  async getNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter(notif => notif.userId === userId);
  }

  async create(data: Omit<Notification, 'id' | 'isRead' | 'createdAt'>): Promise<Notification> {
    const newNotif: Notification = {
      ...data,
      id: String(Math.random()),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.push(newNotif);
    return newNotif;
  }

  async markAsRead(id: string): Promise<boolean> {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      return true;
    }
    return false;
  }
}
