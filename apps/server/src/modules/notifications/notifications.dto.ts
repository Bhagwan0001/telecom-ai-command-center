export class CreateNotificationDto {
  userId!: string;
  message!: string;
  type!: 'info' | 'warning' | 'error';
}
