import { z } from 'zod';
export const createIncidentSchema = z.object({
  title: z.string().min(1),
  node: z.string().min(1),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
});
