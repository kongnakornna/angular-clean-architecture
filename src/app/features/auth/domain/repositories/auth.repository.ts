import { Observable } from 'rxjs';
import { User, LoginCredentials, SignInCredentials, AuthResponse } from '../entities/user.entity';
import { Role, CreateRoleRequest, UpdateRoleRequest, AssignRolePermissionsRequest } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

export interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  mobileNumber: string;
  lineId: string;
  locationId: string;
  roleId: number;
}

export interface ChangeMyPasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordCredentials {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailCredentials {
  code: string;
}

export interface PublicKeyResponse {
  publicKeyAccessToken: string;
  publicKeyRefreshToken: string;
}

export interface UserListParams {
  limit?: number;
  offset?: number;
  email?: string;
  username?: string;
  status?: string;
  roleId?: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  signIn(credentials: SignInCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  logoutAll(): Observable<void>;
  refreshToken(): Observable<AuthResponse>;
  forgotPassword(email: string): Observable<void>;
  resetPassword(credentials: ResetPasswordCredentials): Observable<void>;
  verifyEmail(credentials: VerifyEmailCredentials): Observable<string>;
  getPublicKey(): Observable<PublicKeyResponse>;
  changeMyPassword(credentials: ChangeMyPasswordCredentials): Observable<void>;
  register?(credentials: RegisterCredentials): Observable<void>;
  getCurrentUser(): Observable<User>;
  updateProfile(profile: Partial<User>): Observable<User>;
  getPermissions(): Observable<string[]>;
  hasPermission(permission: string): Observable<boolean>;
  // Admin user management
  listUsers(params?: UserListParams): Observable<{ data: User[]; total: number }>;
  getUserById(id: string): Observable<User>;
  createUser(credentials: RegisterCredentials): Observable<User>;
  updateUser(id: string, data: Partial<User>): Observable<User>;
  deleteUser(id: string): Observable<void>;
  updateUserRole(id: string, roleId: number): Observable<void>;
  updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<void>;
  forceLogoutUser(id: string): Observable<void>;
  
  // Role CRUD
  getRoles(): Observable<Role[]>;
  getRole(id: number): Observable<Role>;
  createRole(request: CreateRoleRequest): Observable<Role>;
  updateRole(id: number, request: UpdateRoleRequest): Observable<Role>;
  deleteRole(id: number): Observable<void>;
  assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Observable<Role>;
  
  // Permissions
  getAllPermissions(): Observable<Permission[]>;
}
