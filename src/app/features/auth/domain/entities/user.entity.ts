import { Permission } from './permission.entity';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  status: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  role: string;
  permissions?: Permission[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
