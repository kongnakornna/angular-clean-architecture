export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
  isDefault?: boolean;
}

export interface AssignRolePermissionsRequest {
  permissions: string[];
}
