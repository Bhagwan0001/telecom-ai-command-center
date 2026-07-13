import { Request, Response, NextFunction } from 'express';
import { UserService } from './users.service';
import { AuditService } from '../audit/audit.service';
import { formatSuccessResponse } from '../../utils/response';
import { hashPassword } from '../../utils/auth';

export class UserController {
  constructor(
    private userService: UserService,
    private auditLogService: AuditService
  ) {}

  public getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.user!.userId);
      const { passwordHash, ...safeUser } = user;
      res.status(200).json(formatSuccessResponse(safeUser, 'Current user profile retrieved'));
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const role = req.query.role as string | undefined;
      const users = await this.userService.getAllUsers(role);
      const safeUsers = users.map((user) => {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      });
      res.status(200).json(formatSuccessResponse(safeUsers, 'Users list retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      const { passwordHash, ...safeUser } = user;
      res.status(200).json(formatSuccessResponse(safeUser, 'User retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);

      await this.auditLogService.log({
        userId: req.user?.userId,
        action: 'UPDATE' as any,
        resource: 'User',
        details: { targetUserId: user.id, email: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      const { passwordHash, ...safeUser } = user;
      res.status(201).json(formatSuccessResponse(safeUser, 'User created successfully'));
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updateData = { ...req.body };
      if (updateData.password) {
        updateData.passwordHash = await hashPassword(updateData.password);
        delete updateData.password;
      }

      const user = await this.userService.updateUser(req.params.id, updateData);

      await this.auditLogService.log({
        userId: req.user?.userId,
        action: 'user.update',
        resource: 'User',
        details: { targetUserId: user.id, email: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      const { passwordHash, ...safeUser } = user;
      res.status(200).json(formatSuccessResponse(safeUser, 'User updated successfully'));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.deleteUser(req.params.id);

      await this.auditLogService.log({
        userId: req.user?.userId,
        action: 'user.delete',
        resource: 'User',
        details: { targetUserId: user.id, email: user.email },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      const { passwordHash, ...safeUser } = user;
      res.status(200).json(formatSuccessResponse(safeUser, 'User deleted successfully'));
    } catch (error) {
      next(error);
    }
  };
}
