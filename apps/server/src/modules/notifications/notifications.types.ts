export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
