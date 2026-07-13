import { AuthRepository } from './auth.repository';
import { UserRepository } from '../users/users.repository';
import { UserService } from '../users/users.service';
import { comparePasswords, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/auth';
import { UnauthorizedError, BadRequestError } from '../../utils/errors';
import { User, Prisma } from '@prisma/client';
import { AuthTokens } from './auth.types';

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
    private userService: UserService
  ) {}

  async register(data: Prisma.UserCreateInput & { password?: string }): Promise<User> {
    return this.userService.createUser(data);
  }

  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = { userId: user.id, role: 'admin' }; // Dummy role, replace with real role logic if needed
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return { user, tokens: { accessToken, refreshToken } };
  }

  async refresh(token: string): Promise<AuthTokens> {
    const dbToken = await this.authRepository.findRefreshToken(token);
    if (!dbToken || dbToken.revokedAt || dbToken.expiresAt < new Date()) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const newPayload = { userId: payload.userId, role: payload.role };
    const accessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await this.authRepository.revokeRefreshToken(token);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.authRepository.createRefreshToken(payload.userId, newRefreshToken, expiresAt);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(token: string): Promise<void> {
    await this.authRepository.revokeRefreshToken(token);
  }

  async getMe(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedError('User not found or inactive');
    }
    return user;
  }
}
