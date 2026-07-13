import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/auth';
import { UnauthorizedError } from '../utils/errors';
import { UserRole } from '@taicc/types';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      role: decoded.role as UserRole,
    };

    next();
  } catch (err) {
    next(new UnauthorizedError('Authentication failed: Invalid token'));
  }
}
