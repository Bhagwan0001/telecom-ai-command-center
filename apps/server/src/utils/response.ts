import type { ApiSuccessResponse, ApiErrorResponse } from '@taicc/types';

export function formatSuccessResponse<T>(data: T, message?: string): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function formatErrorResponse(code: string, message: string, details?: unknown): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
