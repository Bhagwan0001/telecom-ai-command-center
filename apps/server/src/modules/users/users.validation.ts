import { z } from 'zod';
import { UserRole } from '@taicc/types';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  role: UserRole,
  isActive: z.boolean().optional().default(true),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  role: UserRole.optional(),
  isActive: z.boolean().optional(),
});
