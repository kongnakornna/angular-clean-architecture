export interface TokenResponseDto {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
