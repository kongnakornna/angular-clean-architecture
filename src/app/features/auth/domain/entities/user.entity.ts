import { Permission } from './permission.entity';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  status: string | number;
  phoneNumber: string;
  mobileNumber?: string;
  profileImageUrl: string | null;
  role: string;
  roleId?: number;
  permissions?: Permission[];
  isSuperuser?: boolean;
  verified?: boolean;
  lineId?: string;
  locationId?: string;
  lastLogin?: Date;
  lastSignIn?: string;
  createdAt: Date;
  createdDate?: string;
  updatedAt: Date;
  updatedDate?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface PublicKeyResponse {
  publicKeyAccessToken: string;
  publicKeyRefreshToken: string;
}

export interface VerifyEmailCredentials {
  code: string;
}
