import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private dataSource: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.dataSource
      .login({ email: credentials.email, password: credentials.password })
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

  hasPermission(permission: string): Observable<boolean> {
    return this.dataSource.getPermissions().pipe(map((perms) => perms.includes(permission)));
  }

  private mapToAuthResponse(dto: any): AuthResponse {
    return {
      user: this.mapToUser(dto.user),
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresIn: dto.expiresIn,
    };
  }

  private mapToUser(dto: any): User {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      permissions: dto.permissions || [],
      isActive: dto.isActive,
      lastLogin: dto.lastLogin ? new Date(dto.lastLogin) : undefined,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
