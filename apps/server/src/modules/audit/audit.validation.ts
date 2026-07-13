import { z } from 'zod';

export const createAuditLogSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  action: z.string().min(1),
  resource: z.string().min(1),
  details: z.any().optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
});
