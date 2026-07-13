import rateLimit from 'express-rate-limit';
import { formatErrorResponse } from '../utils/response';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: formatErrorResponse('TOO_MANY_REQUESTS', 'Too many requests from this IP, please try again after 15 minutes'),
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 login/register requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: formatErrorResponse('TOO_MANY_REQUESTS', 'Too many login attempts, please try again after 15 minutes'),
});
