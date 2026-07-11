import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  IAuthRepository,
  RegisterCredentials,
  ChangeMyPasswordCredentials,
  ResetPasswordCredentials,
  VerifyEmailCredentials,
  PublicKeyResponse,
  UserListParams,
} from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, SignInCredentials, AuthResponse } from '../../domain/entities/user.entity';
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
    firstName: 'admin',
    lastName: 'dev',
    status: 'ACTIVE',
    phoneNumber: '0955088091',
    mobileNumber: '0955088091',
    profileImageUrl: null,
    role: 'USER',
    roleId: 2,
    permissions: this.getAllPermissions(),
    isSuperuser: true,
    verified: true,
    lineId: 'kongnakorn_line',
    locationId: 'Bangkok',
    lastSignIn: new Date().toISOString(),
    createdAt: new Date('2026-01-01'),
    createdDate: '2026-01-01T00:00:00+07:00',
    updatedAt: new Date(),
    updatedDate: new Date().toISOString(),
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

  signIn(credentials: SignInCredentials): Observable<AuthResponse> {
    const isValid = credentials.email === this.DEMO_USER.email && credentials.password === this.DEMO_PASSWORD;

    if (!isValid) {
      return throwError(() => new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง'));
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

  logoutAll(): Observable<void> {
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

  resetPassword(credentials: ResetPasswordCredentials): Observable<void> {
    return of(void 0);
  }

  verifyEmail(credentials: VerifyEmailCredentials): Observable<string> {
    return of('Email verified successfully');
  }

  getPublicKey(): Observable<PublicKeyResponse> {
    return of({
      publicKeyAccessToken: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
      publicKeyRefreshToken: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----',
    });
  }

  changeMyPassword(credentials: ChangeMyPasswordCredentials): Observable<void> {
    if (credentials.currentPassword !== this.DEMO_PASSWORD) {
      return throwError(() => new Error('Current password is incorrect'));
    }
    if (credentials.newPassword !== credentials.confirmPassword) {
      return throwError(() => new Error('New password and confirmation do not match'));
    }
    return of(void 0);
  }

  getCurrentUser(): Observable<User> {
    return of({ ...this.DEMO_USER });
  }

  updateProfile(profile: Partial<User>): Observable<User> {
    const updatedUser = { ...this.DEMO_USER, ...profile };
    return of(updatedUser);
  }

  getPermissions(): Observable<string[]> {
    return of(this.DEMO_USER.permissions?.map((p) => p.name) || []);
  }

  hasPermission(permission: string): Observable<boolean> {
    return of(true);
  }

  // Admin user management
  listUsers(params?: UserListParams): Observable<{ data: User[]; total: number }> {
    return of({ data: [this.DEMO_USER], total: 1 });
  }

  getUserById(id: string): Observable<User> {
    return of({ ...this.DEMO_USER });
  }

  createUser(credentials: RegisterCredentials): Observable<User> {
    return of({ ...this.DEMO_USER });
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return of({ ...this.DEMO_USER, ...data });
  }

  deleteUser(id: string): Observable<void> {
    return of(void 0);
  }

  updateUserRole(id: string, roleId: number): Observable<void> {
    return of(void 0);
  }

  updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
    return of(void 0);
  }

  forceLogoutUser(id: string): Observable<void> {
    return of(void 0);
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
