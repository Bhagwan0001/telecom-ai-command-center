import { z } from 'zod';
export const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  plan: z.string().min(1),
});
