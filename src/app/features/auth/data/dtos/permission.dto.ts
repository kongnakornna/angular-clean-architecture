export interface PermissionResponseDto {
  id: number;
  name: string;
  description: string;
  module: string;
}

export interface PermissionListResponseDto {
  permissions: PermissionResponseDto[];
}
