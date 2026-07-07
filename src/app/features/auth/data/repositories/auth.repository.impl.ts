import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthRepository, RegisterCredentials } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource
      .login({ username: credentials.username, password: credentials.password })
      .pipe(map((dto) => this.mapToAuthResponse(dto)));
  }

  logout(): Observable<void> {
    return this.dataSource.logout();
  }

  refreshToken(): Observable<AuthResponse> {
    return this.dataSource.refreshToken().pipe(map((dto) => this.mapToAuthResponse(dto)));
  }

  forgotPassword(email: string): Observable<void> {
    return this.dataSource.forgotPassword(email);
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.dataSource.resetPassword(token, password);
  }

  getCurrentUser(): Observable<User> {
    return this.dataSource.getCurrentUser().pipe(map((dto) => this.mapToUser(dto)));
  }

  register(credentials: RegisterCredentials): Observable<void> {
    return this.dataSource.register(credentials);
  }

  hasPermission(permission: string): Observable<boolean> {
    return this.dataSource.getPermissions().pipe(map((perms) => perms.includes(permission)));
  }

  private mapToAuthResponse(dto: LoginResponseDto): AuthResponse {
    return {
      user: this.mapToUser(dto.user),
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresIn: dto.expiresIn,
      tokenType: dto.tokenType,
    };
  }

  private mapToUser(dto: LoginResponseDto['user']): User {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.email,
      fullName: dto.fullName,
      status: dto.status,
      phoneNumber: dto.phoneNumber,
      profileImageUrl: dto.profileImageUrl,
      role: dto.role,
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
