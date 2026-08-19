export interface Token {
  id: string;
  name: string;
  token: string;
  permissions: string[];
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
