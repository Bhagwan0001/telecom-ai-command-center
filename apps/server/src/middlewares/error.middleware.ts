import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { formatErrorResponse } from '../utils/response';
import { logger } from '@taicc/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'An unexpected error occurred';
  let details: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    code = err.constructor.name.replace('Error', '').toUpperCase();
    message = err.message;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = err.message;
  }

  // Log error: operational errors at warn level, programmatic/unexpected errors at error level
  if (err instanceof AppError && err.isOperational) {
    logger.warn(`Operational error: ${message}`, { code, details });
  } else {
    logger.error(`Programmatic error: ${err.message}`, {
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  res.status(statusCode).json(
    formatErrorResponse(
      code,
      message,
      process.env.NODE_ENV === 'development' && !(err instanceof AppError)
        ? { stack: err.stack, ...((details as object) || {}) }
        : details
    )
  );
}
