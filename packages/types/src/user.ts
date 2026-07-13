import { z } from 'zod';

// --- User Roles ---

export const UserRole = z.enum([
  'customer',
  'support_agent',
  'network_engineer',
  'manager',
  'admin',
  'executive',
]);

export type UserRole = z.infer<typeof UserRole>;

// --- User Schema ---

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  role: UserRole,
  avatar: z.string().url().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
