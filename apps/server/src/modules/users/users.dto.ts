import { UserRole } from '@taicc/types';

export class CreateUserDto {
  email!: string;
  password!: string;
  name!: string;
  role!: UserRole;
  isActive?: boolean;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}
