export interface LoginResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: Array<{ id: string; name: string; description: string; module: string }>;
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
