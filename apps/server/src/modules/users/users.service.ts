import { UserRepository } from './users.repository';
import { User, Prisma } from '@prisma/client';
import { hashPassword } from '../../utils/auth';
import { BadRequestError, NotFoundError } from '../../utils/errors';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: Prisma.UserCreateInput & { password?: string }): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new BadRequestError(`User with email '${data.email}' already exists`);
    }

    let passwordHash = data.passwordHash;
    if (data.password) {
      passwordHash = await hashPassword(data.password);
    } else if (!passwordHash) {
      throw new BadRequestError('Password is required');
    }

    const { password, ...rest } = data;
    return this.userRepository.create({
      ...rest,
      passwordHash: passwordHash!,
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User with ID '${id}' not found`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getAllUsers(role?: string): Promise<User[]> {
    return this.userRepository.findAll(undefined, { createdAt: 'desc' });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    await this.getUserById(id);
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string): Promise<User> {
    await this.getUserById(id);
    return this.userRepository.delete(id);
  }
}
