จาก source code ของหน้า preview และโครงสร้างที่คุณกำหนด ฉันจะออกแบบระบบ **Authentication** แบบสมบูรณ์ตามสถาปัตยกรรม Clean Architecture ที่แยกส่วน `features/auth` อย่างชัดเจน โดยจำลองฟังก์ชันการทำงานของหน้า Login และ Forgot Password จากต้นฉบับ Tabler

---

## สรุปโครงสร้างโปรเจค (Auth Module)

โครงสร้างที่คุณให้มานั้นสมบูรณ์และเป็นไปตามหลัก Clean Architecture ฉันจะทำการเติมเต็มรายละเอียดในแต่ละส่วนให้พร้อมใช้งานจริง

```text
src/app/features/auth/
├── domain/                      # ชั้นหลัก (ไม่ขึ้นกับ Framework)
│   ├── entities/
│   │   ├── user.entity.ts       # ข้อมูลผู้ใช้และข้อมูลรับรอง
│   │   └── permission.entity.ts # สิทธิ์การเข้าถึง
│   ├── repositories/
│   │   └── auth.repository.ts   # Interface สำหรับ Repository
│   └── use-cases/
│       ├── login.use-case.ts
│       ├── logout.use-case.ts
│       ├── refresh-token.use-case.ts
│       └── check-permission.use-case.ts
│
├── data/                        # ชั้นข้อมูล (จัดการ API และ DTO)
│   ├── datasources/
│   │   └── auth.api.datasource.ts   # เรียก API จริงผ่าน HttpClient
│   ├── dtos/
│   │   ├── login-request.dto.ts     # Request DTO
│   │   └── login-response.dto.ts    # Response DTO
│   └── repositories/
│       ├── auth.repository.impl.ts  # Repository แบบใช้ API จริง
│       └── auth.repository.demo.ts  # Repository แบบจำลอง (Demo/Offline)
│
└── presentation/                # ชั้น UI (Components)
    └── pages/
        ├── login/               # หน้าเข้าสู่ระบบ
        │   ├── login.component.ts
        │   ├── login.component.html
        │   └── login.component.scss
        └── forgot-password/     # หน้าลืมรหัสผ่าน
            ├── forgot-password.component.ts
            ├── forgot-password.component.html
            └── forgot-password.component.scss
```

---

## 1. Domain Layer (ชั้นหลัก)

### 1.1 Entities: `user.entity.ts`

```typescript
// domain/entities/user.entity.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}
```

### 1.2 Entities: `permission.entity.ts`

```typescript
// domain/entities/permission.entity.ts
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  description?: string;
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage';
```

### 1.3 Repository Interface: `auth.repository.ts`

```typescript
// domain/repositories/auth.repository.ts
import { Observable } from 'rxjs';
import { LoginCredentials, AuthResponse, User } from '../entities/user.entity';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  refreshToken(refreshToken: string): Observable<AuthResponse>;
  getCurrentUser(): Observable<User | null>;
  setAuthData(data: AuthResponse): void;
  clearAuthData(): void;
  getAccessToken(): string | null;
}
```

### 1.4 Use Cases

#### `login.use-case.ts`

```typescript
// domain/use-cases/login.use-case.ts
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { LoginCredentials, AuthResponse } from '../entities/user.entity';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepo.login(credentials).pipe(
      tap(response => this.authRepo.setAuthData(response))
    );
  }
}
```

#### `logout.use-case.ts`

```typescript
// domain/use-cases/logout.use-case.ts
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute(): Observable<void> {
    return this.authRepo.logout().pipe(
      tap(() => this.authRepo.clearAuthData())
    );
  }
}
```

#### `check-permission.use-case.ts`

```typescript
// domain/use-cases/check-permission.use-case.ts
import { Injectable } from '@angular/core';
import { IAuthRepository } from '../repositories/auth.repository';
import { PermissionAction } from '../entities/permission.entity';

@Injectable({ providedIn: 'root' })
export class CheckPermissionUseCase {
  constructor(private authRepo: IAuthRepository) {}

  execute(resource: string, action: PermissionAction): boolean {
    const user = this.authRepo.getCurrentUser();
    if (!user) return false;

    return user.permissions.some(
      p => p.resource === resource && p.action === action
    );
  }
}
```

---

## 2. Data Layer (ชั้นข้อมูล)

### 2.1 DTOs: `login-request.dto.ts`

```typescript
// data/dtos/login-request.dto.ts
export interface LoginRequestDto {
  email: string;
  password: string;
  rememberMe: boolean;
}
```

### 2.2 DTOs: `login-response.dto.ts`

```typescript
// data/dtos/login-response.dto.ts
import { User } from '../../../domain/entities/user.entity';

export interface LoginResponseDto {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

### 2.3 Data Source: `auth.api.datasource.ts`

```typescript
// data/datasources/auth.api.datasource.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiDataSource {
  private apiUrl = '/api/auth'; // เปลี่ยนตาม URL ของคุณ

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/refresh`, { refreshToken });
  }
}
```

### 2.4 Repository Implementation (แบบใช้ API จริง)

```typescript
// data/repositories/auth.repository.impl.ts
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { LoginCredentials, AuthResponse, User } from '../../domain/entities/user.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginRequestDto } from '../dtos/login-request.dto';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements IAuthRepository {
  private readonly TOKEN_KEY = 'auth_access_token';
  private readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private api: AuthApiDataSource) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const request: LoginRequestDto = {
      email: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe || false
    };

    return this.api.login(request).pipe(
      map(response => ({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn
      }))
    );
  }

  logout(): Observable<void> {
    this.clearAuthData();
    return this.api.logout();
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.api.refreshToken(refreshToken).pipe(
      map(response => ({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: response.expiresIn
      }))
    );
  }

  getCurrentUser(): Observable<User | null> {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return of(JSON.parse(userJson) as User);
      } catch {
        return of(null);
      }
    }
    return of(null);
  }

  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, data.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
  }

  clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
```

### 2.5 Repository Demo (สำหรับการทดสอบ)

```typescript
// data/repositories/auth.repository.demo.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { LoginCredentials, AuthResponse, User, UserRole } from '../../domain/entities/user.entity';
import { Permission } from '../../domain/entities/permission.entity';

@Injectable({ providedIn: 'root' })
export class DemoAuthRepositoryImpl implements IAuthRepository {
  private readonly TOKEN_KEY = 'demo_auth_token';
  private readonly USER_KEY = 'demo_auth_user';

  // ข้อมูลจำลอง
  private readonly DEMO_USERS: Record<string, { user: User; password: string }> = {
    'admin@example.com': {
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        avatar: '/assets/images/avatar-admin.jpg',
        permissions: [
          { id: '1', resource: 'all', action: 'manage' }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      password: 'admin123'
    },
    'user@example.com': {
      user: {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'viewer',
        avatar: '/assets/images/avatar-user.jpg',
        permissions: [
          { id: '2', resource: 'dashboard', action: 'read' },
          { id: '3', resource: 'profile', action: 'update' }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      password: 'user123'
    }
  };

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // จำลองการเรียก API
    const demoUser = this.DEMO_USERS[credentials.email];
    
    if (!demoUser || demoUser.password !== credentials.password) {
      return throwError(() => new Error('Invalid email or password'));
    }

    const response: AuthResponse = {
      user: demoUser.user,
      accessToken: `demo-token-${Date.now()}`,
      refreshToken: `demo-refresh-${Date.now()}`,
      expiresIn: 3600
    };

    this.setAuthData(response);
    return of(response).pipe(delay(800));
  }

  logout(): Observable<void> {
    this.clearAuthData();
    return of(void 0).pipe(delay(300));
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    // จำลองการ refresh token
    const user = JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
    if (!user) {
      return throwError(() => new Error('No user found'));
    }

    const response: AuthResponse = {
      user,
      accessToken: `demo-refreshed-token-${Date.now()}`,
      refreshToken: `demo-refresh-${Date.now()}`,
      expiresIn: 3600
    };

    this.setAuthData(response);
    return of(response).pipe(delay(500));
  }

  getCurrentUser(): Observable<User | null> {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        return of(JSON.parse(userJson) as User);
      } catch {
        return of(null);
      }
    }
    return of(null);
  }

  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, data.accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
  }

  clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
```

---

## 3. Presentation Layer (UI Components)

### 3.1 Login Component

#### `login.component.ts`

```typescript
// presentation/pages/login/login.component.ts
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TablerIconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password, rememberMe } = this.loginForm.value;

    this.loginUseCase.execute({ email, password, rememberMe })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Invalid credentials. Please try again.');
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(val => !val);
  }
}
```

#### `login.component.html`

```html
<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="/" class="navbar-brand navbar-brand-autodark">
        <img src="/assets/images/logo.svg" width="110" height="32" alt="Tabler">
      </a>
    </div>

    <div class="card card-md">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Sign in to your account</h2>

        <!-- Error Message -->
        @if (errorMessage()) {
          <div class="alert alert-danger alert-dismissible">
            <i-tabler name="alert-circle" size="20"></i-tabler>
            {{ errorMessage() }}
            <button type="button" class="btn-close" (click)="errorMessage.set(null)"></button>
          </div>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Enter your email"
              formControlName="email"
              [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            >
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <div class="invalid-feedback">
                @if (loginForm.get('email')?.hasError('required')) {
                  Email is required
                } @else if (loginForm.get('email')?.hasError('email')) {
                  Please enter a valid email
                }
              </div>
            }
          </div>

          <!-- Password -->
          <div class="mb-2">
            <label for="password" class="form-label">Password</label>
            <div class="input-group input-group-flat">
              <input
                id="password"
                [type]="showPassword() ? 'text' : 'password'"
                class="form-control"
                placeholder="Enter your password"
                formControlName="password"
                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              >
              <span class="input-group-text" (click)="togglePasswordVisibility()" style="cursor: pointer;">
                <i-tabler [name]="showPassword() ? 'eye' : 'eye-off'" size="20"></i-tabler>
              </span>
            </div>
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <div class="invalid-feedback d-block">
                @if (loginForm.get('password')?.hasError('required')) {
                  Password is required
                } @else if (loginForm.get('password')?.hasError('minlength')) {
                  Password must be at least 6 characters
                }
              </div>
            }
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="mb-3 d-flex justify-content-between align-items-center">
            <label class="form-check">
              <input type="checkbox" class="form-check-input" formControlName="rememberMe">
              <span class="form-check-label">Remember me</span>
            </label>
            <a routerLink="/auth/forgot-password" class="text-decoration-none">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <div class="d-grid">
            <button type="submit" class="btn btn-primary" [disabled]="isLoading()">
              @if (isLoading()) {
                <span class="spinner-border spinner-border-sm me-2"></span>
                Signing in...
              } @else {
                Sign in
              }
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Demo Credentials -->
    <div class="text-center text-muted mt-3 small">
      <p>Demo credentials:</p>
      <div class="row g-1">
        <div class="col-6">
          <span class="badge bg-success text-dark">Admin</span><br>
          admin@example.com / admin123
        </div>
        <div class="col-6">
          <span class="badge bg-info text-dark">User</span><br>
          user@example.com / user123
        </div>
      </div>
    </div>
  </div>
</div>
```

#### `login.component.scss`

```scss
// presentation/pages/login/login.component.scss
.page-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
}

.card-md {
  max-width: 420px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.input-group-flat {
  .input-group-text {
    background: transparent;
    border-left: 0;
  }
}

.form-control:focus {
  border-color: #6c8bf5;
  box-shadow: 0 0 0 0.25rem rgba(108, 139, 245, 0.2);
}

// Dark mode
[data-theme="dark"] & {
  .page-center {
    background: #1a1a2e;
  }
  .card {
    background: #16213e;
    border-color: #2a3a5e;
  }
  .form-control {
    background: #1a1a2e;
    border-color: #2a3a5e;
    color: #e0e0e0;
  }
}
```

### 3.2 Forgot Password Component

#### `forgot-password.component.ts`

```typescript
// presentation/pages/forgot-password/forgot-password.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TablerIconComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);

  emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = signal(false);
  isSubmitted = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // จำลองการส่งอีเมล
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSubmitted.set(true);
    }, 1500);
  }

  resetForm(): void {
    this.isSubmitted.set(false);
    this.emailForm.reset();
    this.errorMessage.set(null);
  }
}
```

#### `forgot-password.component.html`

```html
<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="/" class="navbar-brand navbar-brand-autodark">
        <img src="/assets/images/logo.svg" width="110" height="32" alt="Tabler">
      </a>
    </div>

    <div class="card card-md">
      <div class="card-body">
        @if (!isSubmitted()) {
          <h2 class="card-title text-center mb-4">Forgot Password</h2>
          <p class="text-muted text-center mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <!-- Error Message -->
          @if (errorMessage()) {
            <div class="alert alert-danger alert-dismissible">
              <i-tabler name="alert-circle" size="20"></i-tabler>
              {{ errorMessage() }}
              <button type="button" class="btn-close" (click)="errorMessage.set(null)"></button>
            </div>
          }

          <form [formGroup]="emailForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
                formControlName="email"
                [class.is-invalid]="emailForm.get('email')?.invalid && emailForm.get('email')?.touched"
              >
              @if (emailForm.get('email')?.invalid && emailForm.get('email')?.touched) {
                <div class="invalid-feedback">
                  @if (emailForm.get('email')?.hasError('required')) {
                    Email is required
                  } @else if (emailForm.get('email')?.hasError('email')) {
                    Please enter a valid email
                  }
                </div>
              }
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary" [disabled]="isLoading()">
                @if (isLoading()) {
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Sending...
                } @else {
                  <i-tabler name="mail" size="18"></i-tabler>
                  Send Reset Link
                }
              </button>
            </div>
          </form>
        } @else {
          <!-- Success State -->
          <div class="text-center py-4">
            <div class="mb-3">
              <div class="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block">
                <i-tabler name="check" size="48" class="text-success"></i-tabler>
              </div>
            </div>
            <h3>Check your email</h3>
            <p class="text-muted">
              We've sent a password reset link to <strong>{{ emailForm.get('email')?.value }}</strong>
            </p>
            <button class="btn btn-outline-secondary mt-3" (click)="resetForm()">
              Resend email
            </button>
          </div>
        }
      </div>
    </div>

    <div class="text-center text-muted mt-3">
      <a routerLink="/auth/login" class="text-decoration-none">
        <i-tabler name="arrow-left" size="16"></i-tabler>
        Back to Sign in
      </a>
    </div>
  </div>
</div>
```

---

## 4. การเชื่อมต่อและบูรณาการ

### 4.1 App Routing (เพิ่ม Routes)

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/presentation/pages/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/presentation/pages/forgot-password/forgot-password.component')
          .then(m => m.ForgotPasswordComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      // ... routes ที่ต้องมี Authentication
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
```

### 4.2 HTTP Interceptor (เพิ่ม Token อัตโนมัติ)

```typescript
// core/interceptors/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../../features/auth/domain/repositories/auth.repository';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authRepo = inject(IAuthRepository);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authRepo.getAccessToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

### 4.3 Provider Configuration

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconMail, IconArrowLeft } from 'angular-tabler-icons/icons';
import { routes } from './app.routes';
import { IAuthRepository } from './features/auth/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.impl';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
// หรือใช้ Demo Repository
// import { DemoAuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.demo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideTablerIcons({
      IconMail,
      IconArrowLeft,
      // เพิ่มไอคอนที่ใช้ใน Auth
    }),
    // ใช้ Repository จริง
    { provide: IAuthRepository, useClass: AuthRepositoryImpl },
    // หรือใช้ Demo
    // { provide: IAuthRepository, useClass: DemoAuthRepositoryImpl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
```

---

## 5. หมายเหตุเพิ่มเติม

1. **การใช้ `signal`**: ใช้ Angular Signals สำหรับการจัดการ state ภายใน Component (แทน `BehaviorSubject`)
2. **Lazy Loading**: โหลดหน้า Login และ Forgot Password เฉพาะเมื่อต้องการ
3. **การทดสอบ**: ใช้ `DemoAuthRepositoryImpl` สำหรับพัฒนาและทดสอบโดยไม่ต้องมี Backend
4. **Security**: เก็บ Token ใน `localStorage` (หรือ `sessionStorage` ตามความเหมาะสม)
5. **UX**: มีการแสดงสถานะโหลด ข้อผิดพลาด และการนำทางที่ชัดเจน

โครงสร้างนี้แยกส่วน Authentication ออกจากระบบหลักอย่างสมบูรณ์ พร้อมสำหรับการขยายเพิ่มเติมและสอดคล้องกับต้นฉบับ Tabler Admin Template
ขออภัยครับที่ตอบไม่ตรงกับเทคโนโลยีที่คุณต้องการ ผมจะปรับโครงสร้างทั้งหมดให้เป็น **AngularJS (เวอร์ชัน 1.x)** โดยระบบ Authentication จะถูกจัดระเบียบตามหลักการของ AngularJS อย่างครบถ้วน

---

### 📁 โครงสร้างโฟลเดอร์ระบบ Authentication สำหรับ AngularJS

```
src/
└── 📁 app/
    └── 📁 modules/
        └── 📁 auth/                          (โฟลเดอร์หลัก Authentication Module)
            │
            ├── 📁 pages/                     (หน้าต่างๆ)
            │   ├── 📄 login.page.html       # หน้าเข้าสู่ระบบ (Template)
            │   ├── 📄 login.page.js         # Controller สำหรับ login
            │   ├── 📄 register.page.html    # หน้าสมัครสมาชิก
            │   ├── 📄 register.page.js      # Controller สำหรับ register
            │   ├── 📄 forgot-password.page.html # หน้าลืมรหัสผ่าน
            │   ├── 📄 forgot-password.page.js   # Controller สำหรับ forgot password
            │   ├── 📄 reset-password.page.html  # หน้ารีเซ็ตรหัสผ่าน
            │   ├── 📄 reset-password.page.js    # Controller สำหรับ reset password
            │   ├── 📄 verify-email.page.html    # หน้ายืนยันอีเมล
            │   └── 📄 verify-email.page.js      # Controller สำหรับ verify email
            │
            ├── 📁 components/                (Directives - ส่วนประกอบย่อย)
            │   ├── 📄 auth-layout.directive.js      # Layout พิเศษสำหรับหน้า Auth (ไม่มี sidebar)
            │   ├── 📄 auth-layout.directive.html    # Template ของ auth-layout
            │   ├── 📄 login-form.directive.js       # Directive ฟอร์ม login (แยก logic)
            │   ├── 📄 login-form.directive.html     # Template ของ login-form
            │   ├── 📄 register-form.directive.js    # Directive ฟอร์ม register
            │   ├── 📄 register-form.directive.html  # Template ของ register-form
            │   ├── 📄 social-login.directive.js     # ปุ่มเข้าสู่ระบบด้วย Social
            │   ├── 📄 social-login.directive.html   # Template social-login
            │   └── 📄 protected-route.directive.js  # Directive ปกป้องเส้นทาง (ต้อง login)
            │
            ├── 📁 services/                   (Factories / Services)
            │   ├── 📄 auth.service.js         # Service หลัก จัดการทุกอย่างเกี่ยวกับ Auth
            │   ├── 📄 token.service.js        # จัดการ Token (เก็บ/อ่าน/ลบ ใน localStorage)
            │   ├── 📄 user.service.js         # ดึงข้อมูลโปรไฟล์ผู้ใช้
            │   └── 📄 auth-interceptor.service.js # Interceptor สำหรับแนบ Token ไปทุก Request
            │
            ├── 📁 resolvers/                  (Route Resolvers - โหลดข้อมูลก่อนเข้า page)
            │   ├── 📄 auth.resolver.js        # ตรวจสอบสถานะ Auth ก่อนเปลี่ยนเส้นทาง
            │   └── 📄 user-profile.resolver.js # โหลดข้อมูลผู้ใช้ก่อนเข้า Dashboard
            │
            ├── 📁 guards/                     (Route Guards - ใช้ป้องกันเส้นทาง)
            │   ├── 📄 auth.guard.js           # กันไม่ให้เข้าได้ ถ้ายังไม่ Login
            │   └── 📄 guest.guard.js          # กันไม่ให้เข้าได้ ถ้า Login แล้ว (เช่น กันไม่ให้ไปหน้า Login ซ้ำ)
            │
            ├── 📁 validators/                 (Custom Validators สำหรับฟอร์ม)
            │   ├── 📄 password-match.validator.js  # ตรวจสอบว่ารหัสผ่านตรงกัน (Register)
            │   └── 📄 strong-password.validator.js # ตรวจสอบความแข็งแรงของรหัสผ่าน
            │
            ├── 📁 constants/                  (ค่าคงที่)
            │   └── 📄 auth.constants.js       # เก็บค่าคงที่ เช่น KEY_TOKEN, ROLE_ADMIN, API_ENDPOINTS
            │
            ├── 📁 models/                     (Models สำหรับจัดการข้อมูล)
            │   └── 📄 user.model.js           # กำหนดโครงสร้างข้อมูลผู้ใช้
            │
            ├── 📄 auth.module.js              # ประกาศ Module ของระบบ Auth
            ├── 📄 auth.routes.js              # กำหนดเส้นทาง (Routing) ของระบบ Auth
            └── 📄 auth.config.js              # ตั้งค่าเพิ่มเติม (เช่น interceptor, state config)
```

---

### 📄 ตัวอย่างโค้ดในไฟล์สำคัญ

#### 1. `auth.module.js` - ประกาศ Module
```javascript
angular.module('app.auth', [
  'ui.router',        // ใช้ ui-router สำหรับ routing
  'ngStorage',        // ใช้จัดการ localStorage
  'app.auth.services',
  'app.auth.components',
  'app.auth.pages',
  'app.auth.guards',
  'app.auth.resolvers'
]);
```

#### 2. `auth.routes.js` - กำหนดเส้นทาง
```javascript
angular.module('app.auth').config(function($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true,
      templateUrl: 'modules/auth/components/auth-layout.directive.html'
    })
    .state('auth.login', {
      url: '/login',
      templateUrl: 'modules/auth/pages/login.page.html',
      controller: 'LoginController',
      controllerAs: 'vm',
      data: { requiresGuest: true }  // เฉพาะผู้ที่ยังไม่ Login เท่านั้น
    })
    .state('auth.register', {
      url: '/register',
      templateUrl: 'modules/auth/pages/register.page.html',
      controller: 'RegisterController',
      controllerAs: 'vm',
      data: { requiresGuest: true }
    })
    .state('auth.forgot-password', {
      url: '/forgot-password',
      templateUrl: 'modules/auth/pages/forgot-password.page.html',
      controller: 'ForgotPasswordController',
      controllerAs: 'vm',
      data: { requiresGuest: true }
    })
    .state('auth.reset-password', {
      url: '/reset-password/:token',
      templateUrl: 'modules/auth/pages/reset-password.page.html',
      controller: 'ResetPasswordController',
      controllerAs: 'vm',
      data: { requiresGuest: true }
    })
    .state('auth.verify-email', {
      url: '/verify-email/:token',
      templateUrl: 'modules/auth/pages/verify-email.page.html',
      controller: 'VerifyEmailController',
      controllerAs: 'vm',
      data: { requiresGuest: true }
    })
    .state('auth.logout', {
      url: '/logout',
      controller: function(AuthService, $state) {
        AuthService.logout();
        $state.go('auth.login');
      }
    });
});
```

#### 3. `auth.service.js` - Service หลัก
```javascript
angular.module('app.auth.services', [])
  .service('AuthService', function($http, $q, TokenService, $state) {
    var self = this;
    self.currentUser = null;
    
    // ฟังก์ชัน Login
    self.login = function(credentials) {
      return $http.post('/api/auth/login', credentials)
        .then(function(response) {
          var token = response.data.token;
          TokenService.setToken(token);
          self.loadCurrentUser();
          return response.data;
        });
    };
    
    // ฟังก์ชัน Register
    self.register = function(userData) {
      return $http.post('/api/auth/register', userData)
        .then(function(response) {
          return response.data;
        });
    };
    
    // โหลดข้อมูลผู้ใช้ปัจจุบัน
    self.loadCurrentUser = function() {
      var token = TokenService.getToken();
      if (token) {
        return $http.get('/api/auth/me')
          .then(function(response) {
            self.currentUser = response.data;
            return self.currentUser;
          })
          .catch(function() {
            self.logout();
            return $q.reject();
          });
      }
      return $q.resolve(null);
    };
    
    // Logout
    self.logout = function() {
      TokenService.removeToken();
      self.currentUser = null;
      $state.go('auth.login');
    };
    
    // ตรวจสอบว่า Login หรือยัง
    self.isAuthenticated = function() {
      return !!TokenService.getToken();
    };
    
    return self;
  });
```

#### 4. `auth.guard.js` - Route Guard
```javascript
angular.module('app.auth.guards', [])
  .run(function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // ตรวจสอบว่าเส้นทางต้องการให้ Login หรือไม่
      if (toState.data && toState.data.requiresAuth) {
        if (!AuthService.isAuthenticated()) {
          event.preventDefault();
          $state.go('auth.login');
        }
      }
      
      // ตรวจสอบว่าเส้นทางต้องการให้เป็น Guest (ยังไม่ Login) หรือไม่
      if (toState.data && toState.data.requiresGuest) {
        if (AuthService.isAuthenticated()) {
          event.preventDefault();
          $state.go('dashboard.home');
        }
      }
    });
  });
```

#### 5. `auth-interceptor.service.js` - Interceptor
```javascript
angular.module('app.auth.services')
  .factory('AuthInterceptor', function($q, $injector) {
    return {
      request: function(config) {
        var TokenService = $injector.get('TokenService');
        var token = TokenService.getToken();
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          var AuthService = $injector.get('AuthService');
          AuthService.logout();
        }
        return $q.reject(rejection);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
```

#### 6. `login.page.js` - Controller สำหรับหน้า Login
```javascript
angular.module('app.auth.pages', [])
  .controller('LoginController', function(AuthService, $state) {
    var vm = this;
    vm.credentials = { email: '', password: '' };
    vm.isLoading = false;
    vm.error = null;
    
    vm.submit = function() {
      vm.isLoading = true;
      vm.error = null;
      
      AuthService.login(vm.credentials)
        .then(function() {
          $state.go('dashboard.home');
        })
        .catch(function(error) {
          vm.error = error.data.message || 'Login failed';
        })
        .finally(function() {
          vm.isLoading = false;
        });
    };
  });
```

#### 7. `login.page.html` - Template หน้า Login
```html
<div class="auth-container">
  <div class="auth-card">
    <h2>Login</h2>
    
    <form name="loginForm" ng-submit="vm.submit()" novalidate>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" ng-model="vm.credentials.email" required>
      </div>
      
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" ng-model="vm.credentials.password" required>
      </div>
      
      <div ng-if="vm.error" class="alert alert-danger">
        {{ vm.error }}
      </div>
      
      <button type="submit" class="btn btn-primary" ng-disabled="vm.isLoading">
        {{ vm.isLoading ? 'Loading...' : 'Login' }}
      </button>
      
      <div class="auth-links">
        <a ui-sref="auth.forgot-password">Forgot Password?</a>
        <a ui-sref="auth.register">Create Account</a>
      </div>
    </form>
  </div>
</div>
```

---

### 📊 สรุปการทำงานของแต่ละส่วน

| ส่วนประกอบ | หน้าที่หลัก |
|------------|------------|
| **pages/** | หน้าเพจ + Controller จัดการ UI และ logic เฉพาะหน้า |
| **components/** | Directives ที่นำกลับมาใช้ซ้ำ (ฟอร์ม, layout, social login) |
| **services/** | จัดการทุกอย่างเกี่ยวกับ API, Token, Interceptor |
| **resolvers/** | โหลดข้อมูลก่อนเข้า page (เช่น โหลดโปรไฟล์ user) |
| **guards/** | ป้องกันเส้นทาง (ต้อง login หรือต้องเป็น guest) |
| **validators/** | ตรวจสอบฟอร์มด้านหน้า (ตรงกัน, ความแข็งแรง) |
| **constants/** | ค่าคงที่ (endpoint, key name) |
| **models/** | กำหนดโครงสร้างข้อมูล (ใช้ใน JS) |
| **auth.module.js** | ประกาศ module และ dependency |
| **auth.routes.js** | กำหนด URL และ state |
| **auth.config.js** | ตั้งค่าเพิ่มเติม (interceptor) |

---

### 🔧 การนำไปใช้งาน

1. **Inject Module** ใน `app.module.js`:
```javascript
angular.module('app', [
  'app.auth'
]);
```

2. **ใช้ Directive** ใน HTML:
```html
<!-- ใช้ protected-route เพื่อป้องกันหน้า -->
<protected-route>
  <div ui-view></div>
</protected-route>
```

3. **ใช้งาน Service** ใน Controller:
```javascript
function DashboardController(AuthService) {
  var vm = this;
  vm.user = AuthService.currentUser;
}
```

---

โครงสร้างนี้ครอบคลุมทุกหน้าฟังก์ชัน Authentication ของ AngularJS อย่างครบถ้วน แยกส่วนงานชัดเจน และปฏิบัติตามแนวทางของ AngularJS 1.x อย่างดี หากต้องการให้ลงลึกในส่วนใดเพิ่มเติม บอกได้เลยครับ
