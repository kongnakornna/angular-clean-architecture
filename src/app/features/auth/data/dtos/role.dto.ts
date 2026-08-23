export interface RoleResponseDto {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoleListResponseDto {
  roles: RoleResponseDto[];
  total: number;
}

export interface CreateRoleRequestDto {
  name: string;
  description: string;
  permissions: string[];
  is_default?: boolean;
}

export interface UpdateRoleRequestDto {
  name?: string;
  description?: string;
  permissions?: string[];
  is_default?: boolean;
}

export interface AssignRolePermissionsRequestDto {
  permissions: string[];
}
