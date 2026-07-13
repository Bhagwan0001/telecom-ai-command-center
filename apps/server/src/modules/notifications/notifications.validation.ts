import { z } from 'zod';
export const createNotificationSchema = z.object({
  userId: z.string().uuid(),
  message: z.string().min(1),
  type: z.enum(['info', 'warning', 'error']),
});
