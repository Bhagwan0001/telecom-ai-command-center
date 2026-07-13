import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { AuditService } from '../audit/audit.service';
import { formatSuccessResponse } from '../../utils/response';

export class AuthController {
  constructor(
    private authService: AuthService,
    private auditLogService: AuditService
  ) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.register(req.body);

      await this.auditLogService.log({
        userId: user.id,
        action: 'CREATE' as any, // Temporary fix for enum
        resource: 'User',
        details: { email: user.email, firstName: user.firstName },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      const { passwordHash, ...safeUser } = user;
      res.status(201).json(formatSuccessResponse(safeUser, 'User registered successfully'));
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await this.authService.login(email, password);

      await this.auditLogService.log({
        userId: user.id,
        action: 'LOGIN' as any, // Temporary fix for enum
        resource: 'User',
        details: { email: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      const { passwordHash, ...safeUser } = user;
      res.status(200).json(
        formatSuccessResponse(
          {
            user: safeUser,
            tokens,
          },
          'Login successful'
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const tokens = await this.authService.refresh(refreshToken);
      res.status(200).json(formatSuccessResponse(tokens, 'Token refreshed successfully'));
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      await this.authService.logout(refreshToken);

      if (req.user) {
        await this.auditLogService.log({
          userId: req.user.userId,
          action: 'LOGOUT' as any, // Temporary fix for enum
          resource: 'User',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        });
      }

      res.status(200).json(formatSuccessResponse(null, 'Logout successful'));
    } catch (error) {
      next(error);
    }
  };

  public getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.authService.getMe(req.user!.userId);
      const { passwordHash, ...safeUser } = user;
      res.status(200).json(formatSuccessResponse(safeUser, 'User retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };
}
