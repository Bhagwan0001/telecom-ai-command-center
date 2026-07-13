/**
 * Generates a standardized API success response envelope.
 */
export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generates a standardized API error response envelope.
 */
export function createErrorResponse(code: string, message: string, details?: unknown) {
  return {
    success: false as const,
    error: { code, message, details },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Delays execution by the given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parses a JSON string. Returns null on failure.
 */
export function safeJsonParse<T = unknown>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
