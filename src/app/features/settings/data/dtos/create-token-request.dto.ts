export interface CreateTokenRequestDto {
  name: string;
  permissions: string[];
  expiresAt: string;
}
