export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve';

export interface PermissionGroup {
  module: string;
  actions: PermissionAction[];
}
