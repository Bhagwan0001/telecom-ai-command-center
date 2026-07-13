import { z } from 'zod';

// --- Standard API Response Envelope ---

export const ApiSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
  message: z.string().optional(),
  timestamp: z.string().datetime(),
});

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
  timestamp: z.string().datetime(),
});

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// --- Pagination ---

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiSuccessResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
