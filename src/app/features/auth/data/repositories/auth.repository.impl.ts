import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { IAuthRepository, RegisterCredentials, ChangeMyPasswordCredentials, ResetPasswordCredentials, VerifyEmailCredentials, UserListParams, PublicKeyResponse } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, SignInCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { Role, CreateRoleRequest, UpdateRoleRequest, AssignRolePermissionsRequest } from '../../domain/entities/role.entity';
import { Permission } from '../../domain/entities/permission.entity';
import { RoleResponseDto, CreateRoleRequestDto, UpdateRoleRequestDto } from '../dtos/role.dto';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource.login({ username: credentials.username, password: credentials.password }).pipe(
      switchMap((dto) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
        const tokens = this.mapToTokens(dto);
        return this.dataSource.getCurrentUser().pipe(
          map((userDto) => ({
            ...tokens,
            user: this.mapToUser(userDto),
          }))
        );
      })
    );
  }

  signIn(credentials: SignInCredentials): Observable<AuthResponse> {
    return this.dataSource.signIn({ email: credentials.email, password: credentials.password }).pipe(
      switchMap((dto) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
        const tokens = this.mapToTokens(dto);
        return this.dataSource.getCurrentUser().pipe(
          map((userDto) => ({
            ...tokens,
            user: this.mapToUser(userDto),
          }))
        );
      })
    );
  }

  logout(): Observable<void> {
    return this.dataSource.logout();
  }

  logoutAll(): Observable<void> {
    return this.dataSource.logoutAll();
  }

  refreshToken(): Observable<AuthResponse> {
    return this.dataSource.refreshToken().pipe(
      switchMap((dto) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, dto.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, dto.refreshToken);
        const tokens = this.mapToTokens(dto);
        return this.dataSource.getCurrentUser().pipe(
          map((userDto) => ({
            ...tokens,
            user: this.mapToUser(userDto),
          }))
        );
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    return this.dataSource.forgotPassword(email);
  }

  resetPassword(credentials: ResetPasswordCredentials): Observable<void> {
    return this.dataSource.resetPassword(credentials.code, {
      new_password: credentials.newPassword,
      confirm_password: credentials.confirmPassword,
    });
  }

  verifyEmail(credentials: VerifyEmailCredentials): Observable<string> {
    return this.dataSource.verifyEmail(credentials.code);
  }

  getPublicKey(): Observable<PublicKeyResponse> {
    return this.dataSource.getPublicKey().pipe(
      map((dto) => ({
        publicKeyAccessToken: dto.public_key_access_token,
        publicKeyRefreshToken: dto.public_key_refresh_token,
      }))
    );
  }

  changeMyPassword(credentials: ChangeMyPasswordCredentials): Observable<void> {
    return this.dataSource.changeMyPassword(credentials);
  }

  getCurrentUser(): Observable<User> {
    return this.dataSource.getCurrentUser().pipe(map((dto) => this.mapToUser(dto)));
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.dataSource.updateProfile(this.mapToUpdateDto(data)).pipe(map((dto) => this.mapToUser(dto)));
  }

  register(credentials: RegisterCredentials): Observable<void> {
    return this.dataSource.register(this.mapToRegisterDto(credentials));
  }

  hasPermission(permission: string): Observable<boolean> {
    return this.dataSource.getPermissions().pipe(map((perms) => perms.includes(permission)));
  }

  getPermissions(): Observable<string[]> {
    return this.dataSource.getPermissions();
  }

  listUsers(params?: UserListParams): Observable<{ data: User[]; total: number }> {
    return this.dataSource.listUsers(params).pipe(
      map((response) => ({
        data: response.data.map((dto) => this.mapToUser(dto)),
        total: response.total,
      }))
    );
  }

  getUserById(id: string): Observable<User> {
    return this.dataSource.getUserById(id).pipe(map((dto) => this.mapToUser(dto)));
  }

  createUser(data: RegisterCredentials): Observable<User> {
    return this.dataSource.createUser(this.mapToRegisterDto(data)).pipe(map((dto) => this.mapToUser(dto)));
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.dataSource.updateUser(id, this.mapToUpdateDto(data)).pipe(map((dto) => this.mapToUser(dto)));
  }

  deleteUser(id: string): Observable<void> {
    return this.dataSource.deleteUser(id);
  }

  updateUserRole(id: string, roleId: number): Observable<void> {
    return this.dataSource.updateUserRole(id, roleId);
  }

  updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
    return this.dataSource.updateUserPassword(id, oldPassword, newPassword, confirmPassword);
  }

  forceLogoutUser(id: string): Observable<void> {
    return this.dataSource.forceLogoutUser(id);
  }

  // Role CRUD
  getRoles(): Observable<Role[]> {
    return this.dataSource.getRoles().pipe(
      map((response) => response.roles.map((dto) => this.mapRoleDtoToEntity(dto)))
    );
  }

  getRole(id: number): Observable<Role> {
    return this.dataSource.getRole(id).pipe(
      map((dto) => this.mapRoleDtoToEntity(dto))
    );
  }

  createRole(request: CreateRoleRequest): Observable<Role> {
    const dto: CreateRoleRequestDto = {
      name: request.name,
      description: request.description,
      permissions: request.permissions,
      is_default: request.isDefault,
    };
    return this.dataSource.createRole(dto).pipe(
      map((response) => this.mapRoleDtoToEntity(response))
    );
  }

  updateRole(id: number, request: UpdateRoleRequest): Observable<Role> {
    const dto: UpdateRoleRequestDto = {
      name: request.name,
      description: request.description,
      permissions: request.permissions,
      is_default: request.isDefault,
    };
    return this.dataSource.updateRole(id, dto).pipe(
      map((response) => this.mapRoleDtoToEntity(response))
    );
  }

  deleteRole(id: number): Observable<void> {
    return this.dataSource.deleteRole(id);
  }

  assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Observable<Role> {
    return this.dataSource.assignRolePermissions(id, { permissions: request.permissions }).pipe(
      map((response) => this.mapRoleDtoToEntity(response))
    );
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.dataSource.getAllPermissions().pipe(
      map((response) => response.permissions.map((dto) => this.mapPermissionDtoToEntity(dto)))
    );
  }

  private mapRoleDtoToEntity(dto: RoleResponseDto): Role {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      permissions: dto.permissions,
      isDefault: dto.is_default,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  }

  private mapPermissionDtoToEntity(dto: { id: number; name: string; description: string; module: string }): Permission {
    return {
      id: dto.id.toString(),
      name: dto.name,
      description: dto.description,
      module: dto.module,
    };
  }

  private mapToTokens(dto: LoginResponseDto): Pick<AuthResponse, 'accessToken' | 'refreshToken' | 'tokenType' | 'expiresIn'> {
    return {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      tokenType: dto.tokenType,
      expiresIn: 3600, // Default 1 hour, could be decoded from JWT
    };
  }

  private mapToUser(dto: UserResponseDto): User {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      fullName: dto.fullname,
      firstName: dto.firstname,
      lastName: dto.lastname,
      status: dto.status?.toString() ?? '1',
      phoneNumber: dto.phone_number,
      mobileNumber: dto.mobile_number,
      profileImageUrl: null,
      role: dto.role_id?.toString() ?? '',
      roleId: dto.role_id,
      permissions: [],
      isSuperuser: dto.is_superuser,
      verified: dto.verified,
      lineId: dto.line_id,
      locationId: dto.location_id,
      lastLogin: dto.last_sign_in ? new Date(dto.last_sign_in) : undefined,
      lastSignIn: dto.last_sign_in,
      createdAt: dto.createddate ? new Date(dto.createddate) : new Date(),
      createdDate: dto.createddate,
      updatedAt: dto.updateddate ? new Date(dto.updateddate) : new Date(),
      updatedDate: dto.updateddate,
    };
  }

  private mapToRegisterDto(credentials: RegisterCredentials): RegisterRequestDto {
    return {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirm_password: credentials.confirmPassword,
      firstname: credentials.firstName,
      lastname: credentials.lastName,
      fullname: credentials.fullName,
      phone_number: credentials.phoneNumber,
      mobile_number: credentials.mobileNumber,
      line_id: credentials.lineId,
      location_id: credentials.locationId,
      role_id: credentials.roleId,
    };
  }

  private mapToUpdateDto(data: Partial<User>): Partial<UserResponseDto> {
    const dto: Partial<UserResponseDto> = {};
    if (data.firstName !== undefined) dto.firstname = data.firstName;
    if (data.lastName !== undefined) dto.lastname = data.lastName;
    if (data.fullName !== undefined) dto.fullname = data.fullName;
    if (data.mobileNumber !== undefined) dto.mobile_number = data.mobileNumber;
    if (data.phoneNumber !== undefined) dto.phone_number = data.phoneNumber;
    if (data.lineId !== undefined) dto.line_id = data.lineId;
    if (data.locationId !== undefined) dto.location_id = data.locationId;
    return dto;
  }
}
