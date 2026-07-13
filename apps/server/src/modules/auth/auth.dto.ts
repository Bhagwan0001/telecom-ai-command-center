export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto {
  email!: string;
  password!: string;
  name!: string;
  role?: string;
}

export class RefreshTokenDto {
  refreshToken!: string;
}
