import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { logger } from '@taicc/logger';

export class SocketService {
  private static io: Server | null = null;

  public static init(httpServer: HttpServer): Server {
    this.io = new Server(httpServer, {
      cors: {
        origin: env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    // JWT Authentication middleware for Socket.io
    this.io.use((socket: Socket, next) => {
      const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }

      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string };
        socket.data.user = decoded;
        next();
      } catch (err) {
        return next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket: Socket) => {
      const { userId, role } = socket.data.user;
      logger.info(`🔌 Socket connected: User ${userId} (${role}) - Socket ID: ${socket.id}`);

      // Join a user-specific room
      socket.join(`user:${userId}`);
      // Join a role-specific room
      socket.join(`role:${role}`);

      socket.on('disconnect', () => {
        logger.info(`🔌 Socket disconnected: Socket ID: ${socket.id}`);
      });
    });

    logger.info('🔌 Socket.io server initialized with JWT middleware');
    return this.io;
  }

  public static getIO(): Server {
    if (!this.io) {
      throw new Error('Socket.io has not been initialized. Please call init() first.');
    }
    return this.io;
  }

  public static emitToUser(userId: string, event: string, data: unknown): void {
    if (this.io) {
      this.io.to(`user:${userId}`).emit(event, data);
    }
  }

  public static emitToRole(role: string, event: string, data: unknown): void {
    if (this.io) {
      this.io.to(`role:${role}`).emit(event, data);
    }
  }

  public static broadcast(event: string, data: unknown): void {
    if (this.io) {
      this.io.emit(event, data);
    }
  }
}
