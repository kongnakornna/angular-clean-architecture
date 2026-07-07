import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAuthRepository, RegisterCredentials } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { Permission } from '../../domain/entities/permission.entity';

@Injectable()
export class DemoAuthRepositoryImpl implements IAuthRepository {
  private readonly DEMO_USERNAME = 'admin';
  private readonly DEMO_PASSWORD = 'P@ssw0rd';

  private readonly DEMO_USER: User = {
    id: 'cea342be-db34-448c-bcef-eb60e7797e73',
    username: 'admin',
    email: 'admin@gmail.com',
    fullName: 'admin dev',
    status: 'ACTIVE',
    phoneNumber: '0955088091',
    profileImageUrl: null,
    role: 'USER',
    permissions: this.getAllPermissions(),
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  };

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const isValid =
      credentials.username === this.DEMO_USERNAME && credentials.password === this.DEMO_PASSWORD;

    if (!isValid) {
      return throwError(() => new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'));
    }

    return of({
      user: { ...this.DEMO_USER },
      accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWEzNDJiZS1kYjM0LTQ0OGMtYmNlZi1lYjYwZTc3OTdlNzMiLCJ1c2VybmFtZSI6ImFkbWluIiwidHlwZSI6IkFDQ0VTUyIsImlhdCI6MTc4MzM4MTUzNiwiZXhwIjoxNzgzMzg1MTM2fQ',
      refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWEzNDJiZS1kYjM0LTQ0OGMtYmNlZi1lYjYwZTc3OTdlNzMiLCJ0eXBlIjoiUkVGUkVTSCIsImlhdCI6MTc4MzM4MTUzNiwiZXhwIjoxNzgzNDY3OTM2fQ',
      expiresIn: 3600,
      tokenType: 'Bearer',
    });
  }

  logout(): Observable<void> {
    return of(void 0);
  }

  refreshToken(): Observable<AuthResponse> {
    return of({
      user: { ...this.DEMO_USER },
      accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWEzNDJiZS1kYjM0LTQ0OGMtYmNlZi1lYjYwZTc3OTdlNzMiLCJ0eXBlIjoiUkVGUkVTSCIsImlhdCI6MTc4MzM4MTUzNiwiZXhwIjoxNzgzNDY3OTM2fQ',
      refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWEzNDJiZS1kYjM0LTQ0OGMtYmNlZi1lYjYwZTc3OTdlNzMiLCJ0eXBlIjoiUkVGUkVTSCIsImlhdCI6MTc4MzM4MTUzNiwiZXhwIjoxNzgzNDY3OTM2fQ',
      expiresIn: 3600,
      tokenType: 'Bearer',
    });
  }

  register(credentials: RegisterCredentials): Observable<void> {
    return of(void 0);
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
