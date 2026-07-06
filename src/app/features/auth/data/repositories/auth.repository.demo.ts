import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { Permission } from '../../domain/entities/permission.entity';
import { UserRole } from '../../../../core/constants/enums';

@Injectable()
export class DemoAuthRepositoryImpl implements IAuthRepository {
  private readonly DEMO_EMAIL = 'demo';
  private readonly DEMO_PASSWORD = 'demo';

  private readonly DEMO_USER: User = {
    id: 'demo-001',
    email: 'demo@demo.com',
    firstName: 'เดโม่',
    lastName: 'ยูสเซอร์',
    role: UserRole.ADMIN,
    permissions: this.getAllPermissions(),
    isActive: true,
    lastLogin: new Date(),
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  };

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const isValid =
      credentials.email === this.DEMO_EMAIL && credentials.password === this.DEMO_PASSWORD;

    if (!isValid) {
      return throwError(() => new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'));
    }

    return of({
      user: { ...this.DEMO_USER },
      accessToken: 'demo-access-token-abc123',
      refreshToken: 'demo-refresh-token-xyz789',
      expiresIn: 86400,
    });
  }

  logout(): Observable<void> {
    return of(void 0);
  }

  refreshToken(): Observable<AuthResponse> {
    return of({
      user: { ...this.DEMO_USER },
      accessToken: 'demo-access-token-abc123',
      refreshToken: 'demo-refresh-token-xyz789',
      expiresIn: 86400,
    });
  }

  forgotPassword(email: string): Observable<void> {
    return of(void 0);
  }

  resetPassword(token: string, password: string): Observable<void> {
    return of(void 0);
  }

  getCurrentUser(): Observable<User> {
    return of({ ...this.DEMO_USER });
  }

  hasPermission(permission: string): Observable<boolean> {
    return of(true);
  }

  private getAllPermissions(): Permission[] {
    const modules = [
      'dashboard', 'job_card', 'customer', 'quotation', 'purchase_order',
      'inventory', 'payment', 'document', 'email', 'batch', 'iot', 'wos',
    ];
    const actions = ['view', 'create', 'edit', 'delete', 'approve'];
    const permissions: Permission[] = [];
    for (const module of modules) {
      for (const action of actions) {
        permissions.push({
          id: `${module}.${action}`,
          name: `${module}.${action}`,
          description: `Can ${action} ${module}`,
          module,
        });
      }
    }
    return permissions;
  }
}
