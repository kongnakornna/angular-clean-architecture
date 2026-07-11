import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { IAuthRepository, RegisterCredentials, ChangeMyPasswordCredentials, ResetPasswordCredentials, VerifyEmailCredentials, UserListParams, PublicKeyResponse } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, SignInCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource.login({ username: credentials.username, password: credentials.password }).pipe(
      switchMap((dto) => {
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
    return this.dataSource.updateProfile(data as Partial<UserResponseDto>).pipe(map((dto) => this.mapToUser(dto)));
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
    return this.dataSource.updateUser(id, data as Partial<UserResponseDto>).pipe(map((dto) => this.mapToUser(dto)));
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
      status: dto.status.toString(),
      phoneNumber: dto.mobile_number,
      profileImageUrl: null,
      role: dto.role_id.toString(),
      permissions: [],
      lastLogin: dto.last_sign_in ? new Date(dto.last_sign_in) : undefined,
      createdAt: new Date(dto.createddate),
      updatedAt: new Date(dto.updateddate),
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
}
