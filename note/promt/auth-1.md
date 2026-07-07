เราจะสร้างระบบ Authentication ใหม่ทั้งหมดตาม Prompt ที่ออกแบบไว้ โดยใช้ **Angular 17+ Standalone Components**, **Tabler UI**, **Clean Architecture** และรองรับ **i18n** พร้อม **Demo Repository** สำหรับทดสอบ offline

ด้านล่างคือโครงสร้างไฟล์และโค้ดทั้งหมด (เรียงตามโฟลเดอร์) ที่พร้อมใช้งานจริง  

---

## 📁 โครงสร้างไฟล์ทั้งหมด

```
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app.constants.ts
│   │   │   └── api.config.ts
│   │   ├── di/
│   │   │   └── tokens.ts
│   │   └── services/
│   │       └── layout.service.ts
│   ├── shared/
│   │   ├── i18n/
│   │   │   ├── presentation/
│   │   │   │   ├── pages/
│   │   │   │   │   └── language-selector/
│   │   │   │   │       └── language-selector.component.ts
│   │   │   │   └── pipes/
│   │   │   │       └── translate.pipe.ts
│   │   │   └── data/
│   │   │       └── i18n.service.ts (หรือใช้ translate pipe โดยตรง)
│   │   └── pipes/
│   │       └── translate.pipe.ts (อีกตัวอาจรวมกัน)
│   ├── features/
│   │   └── auth/
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   ├── user.entity.ts
│   │       │   │   └── permission.entity.ts
│   │       │   ├── repositories/
│   │       │   │   └── auth.repository.ts
│   │       │   └── use-cases/
│   │       │       ├── login.use-case.ts
│   │       │       ├── logout.use-case.ts
│   │       │       ├── refresh-token.use-case.ts
│   │       │       ├── forgot-password.use-case.ts
│   │       │       ├── reset-password.use-case.ts
│   │       │       └── check-permission.use-case.ts
│   │       ├── data/
│   │       │   ├── dtos/
│   │       │   │   ├── login-request.dto.ts
│   │       │   │   └── login-response.dto.ts
│   │       │   ├── datasources/
│   │       │   │   └── auth.api.datasource.ts
│   │       │   └── repositories/
│   │       │       ├── auth.repository.impl.ts
│   │       │       └── auth.repository.demo.ts
│   │       └── presentation/
│   │           ├── layouts/
│   │           │   └── auth-layout/
│   │           │       └── auth-layout.component.ts
│   │           └── pages/
│   │               ├── login/
│   │               │   ├── login.component.ts
│   │               │   └── login.component.html
│   │               ├── sign-up/
│   │               │   ├── sign-up.component.ts
│   │               │   └── sign-up.component.html
│   │               ├── forgot-password/
│   │               │   ├── forgot-password.component.ts
│   │               │   └── forgot-password.component.html
│   │               ├── reset-password/
│   │               │   ├── reset-password.component.ts
│   │               │   └── reset-password.component.html
│   │               ├── lock-screen/
│   │               │   ├── lock-screen.component.ts
│   │               │   └── lock-screen.component.html
│   │               ├── two-step-verification/
│   │               │   ├── two-step-verification.component.ts
│   │               │   └── two-step-verification.component.html
│   │               ├── two-step-code/
│   │               │   ├── two-step-code.component.ts
│   │               │   └── two-step-code.component.html
│   │               ├── user-list/
│   │               │   ├── user-list.component.ts
│   │               │   └── user-list.component.html
│   │               ├── user-create/
│   │               │   ├── user-create.component.ts
│   │               │   └── user-create.component.html
│   │               ├── role-list/
│   │               │   ├── role-list.component.ts
│   │               │   └── role-list.component.html
│   │               └── theme-settings/
│   │                   ├── theme-settings.component.ts
│   │                   └── theme-settings.component.html
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.component.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── assets/
    └── i18n/
        ├── en.json
        └── th.json
```

---

## 🧩 โค้ดแต่ละไฟล์ (เรียงตามลำดับการทำงาน)

### 1. Environment

**environments/environment.ts**
```typescript
export const environment = {
  production: false,
  demo: true, // ใช้ demo repository
  apiUrl: 'http://localhost:1080/api/v1'
};
```

**environments/environment.prod.ts**
```typescript
export const environment = {
  production: true,
  demo: false,
  apiUrl: 'https://api.icmon.com/api/v1'
};
```

---

### 2. Core Constants & Tokens

**core/constants/app.constants.ts**
```typescript
export const APP_CONSTANTS = {
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user',
  THEME_KEY: 'theme_settings'
};
```

**core/constants/api.config.ts**
```typescript
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    me: '/auth/me',
    permissions: '/auth/permissions'
  }
};
```

**core/di/tokens.ts**
```typescript
import { InjectionToken } from '@angular/core';
import { IAuthRepository } from '../../features/auth/domain/repositories/auth.repository';

export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('AUTH_REPOSITORY');
```

---

### 3. Layout Service (จัดการธีม)

**core/services/layout.service.ts**
```typescript
import { Injectable, signal, effect } from '@angular/core';
import { APP_CONSTANTS } from '../constants/app.constants';

export interface LayoutSettings {
  layoutMode: 'vertical' | 'fluid' | 'boxed' | 'condensed';
  navbarPosition: 'left' | 'right';
  navbarDark: boolean;
  navbarOverlap: boolean;
  navbarSticky: boolean;
  rtlMode: boolean;
  colorScheme: string;
  fontFamily: string;
  themeBase: string;
  borderRadius: number;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private defaultSettings: LayoutSettings = {
    layoutMode: 'vertical',
    navbarPosition: 'left',
    navbarDark: false,
    navbarOverlap: false,
    navbarSticky: false,
    rtlMode: false,
    colorScheme: 'blue',
    fontFamily: 'sans-serif',
    themeBase: 'slate',
    borderRadius: 1
  };

  private settings = signal<LayoutSettings>(this.loadSettings());

  constructor() {
    // เก็บลง localStorage เมื่อมีการเปลี่ยนแปลง
    effect(() => {
      localStorage.setItem(APP_CONSTANTS.THEME_KEY, JSON.stringify(this.settings()));
      this.applyTheme(this.settings());
    });
  }

  private loadSettings(): LayoutSettings {
    const stored = localStorage.getItem(APP_CONSTANTS.THEME_KEY);
    if (stored) {
      try {
        return { ...this.defaultSettings, ...JSON.parse(stored) };
      } catch {
        return { ...this.defaultSettings };
      }
    }
    return { ...this.defaultSettings };
  }

  get snapshot(): LayoutSettings {
    return this.settings();
  }

  update(partial: Partial<LayoutSettings>): void {
    this.settings.update(current => ({ ...current, ...partial }));
  }

  reset(): void {
    this.settings.set({ ...this.defaultSettings });
  }

  private applyTheme(settings: LayoutSettings): void {
    // ใช้ document.documentElement.style.setProperty หรือคลาส CSS
    const root = document.documentElement;
    // ตัวอย่าง: ตั้งค่า color scheme
    root.style.setProperty('--tblr-theme-color', `var(--tblr-${settings.colorScheme})`);
    // ตั้งค่า font family
    root.style.setProperty('--tblr-font-family', settings.fontFamily);
    // ตั้งค่า border radius
    root.style.setProperty('--tblr-border-radius', `${settings.borderRadius}rem`);
    // ตั้งค่า theme base
    root.style.setProperty('--tblr-bg', `var(--tblr-bg-${settings.themeBase})`);
    // ตั้งค่า layout mode (เพิ่มคลาสให้ body)
    document.body.className = `layout-${settings.layoutMode}`;
    // navbar position
    if (settings.navbarPosition === 'right') {
      document.body.classList.add('navbar-right');
    } else {
      document.body.classList.remove('navbar-right');
    }
    // dark navbar
    if (settings.navbarDark) {
      document.body.classList.add('navbar-dark');
    } else {
      document.body.classList.remove('navbar-dark');
    }
    // etc.
  }
}
```

---

### 4. Shared i18n

**shared/i18n/presentation/pipes/translate.pipe.ts**
```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../data/i18n.service';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: false
})
export class AppTranslatePipe implements PipeTransform {
  constructor(private i18n: I18nService) {}
  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
```

**shared/i18n/data/i18n.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translations: any = {};
  private currentLang = 'en';
  private langSubject = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {
    this.loadLanguage('en');
  }

  loadLanguage(lang: string): void {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe(data => {
      this.translations = data;
      this.currentLang = lang;
      this.langSubject.next(lang);
    });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  }

  getCurrentLang(): string {
    return this.currentLang;
  }

  onLangChange() {
    return this.langSubject.asObservable();
  }
}
```

**shared/i18n/presentation/pages/language-selector/language-selector.component.ts**
```typescript
import { Component, inject } from '@angular/core';
import { I18nService } from '../../../data/i18n.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule, NgFor],
  template: `
    <select class="form-select form-select-sm w-auto" [(ngModel)]="selectedLang" (change)="changeLang()">
      <option *ngFor="let lang of languages" [value]="lang.code">{{ lang.label }}</option>
    </select>
  `
})
export class LanguageSelectorComponent {
  private i18n = inject(I18nService);
  languages = [
    { code: 'en', label: 'English' },
    { code: 'th', label: 'ไทย' }
  ];
  selectedLang = this.i18n.getCurrentLang();

  changeLang(): void {
    this.i18n.loadLanguage(this.selectedLang);
  }
}
```

---

### 5. Auth Domain Entities & Repository Interface

**features/auth/domain/entities/user.entity.ts**
```typescript
import { Permission } from './permission.entity';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  status: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  role: string;
  permissions?: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
```

**features/auth/domain/entities/permission.entity.ts**
```typescript
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}
```

**features/auth/domain/repositories/auth.repository.ts**
```typescript
import { Observable } from 'rxjs';
import { User, LoginCredentials, AuthResponse } from '../entities/user.entity';

export interface IAuthRepository {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  refreshToken(): Observable<AuthResponse>;
  forgotPassword(email: string): Observable<void>;
  resetPassword(token: string, password: string): Observable<void>;
  getCurrentUser(): Observable<User>;
  hasPermission(permission: string): Observable<boolean>;
}
```

---

### 6. Use Cases

**features/auth/domain/use-cases/login.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../repositories/auth.repository';
import { LoginCredentials, AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.authRepo.login(credentials).pipe(
      tap((response) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
        localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(response.user));
      })
    );
  }
}
```

**features/auth/domain/use-cases/logout.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../repositories/auth.repository';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(): Observable<void> {
    return this.authRepo.logout().pipe(
      tap(() => {
        localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
        localStorage.removeItem(APP_CONSTANTS.REFRESH_TOKEN_KEY);
        localStorage.removeItem(APP_CONSTANTS.USER_KEY);
      })
    );
  }
}
```

**features/auth/domain/use-cases/refresh-token.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class RefreshTokenUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(): Observable<AuthResponse> {
    return this.authRepo.refreshToken().pipe(
      tap((response) => {
        localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, response.accessToken);
        localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
      })
    );
  }
}
```

**features/auth/domain/use-cases/forgot-password.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(email: string): Observable<void> {
    return this.authRepo.forgotPassword(email);
  }
}
```

**features/auth/domain/use-cases/reset-password.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ResetPasswordUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(token: string, password: string): Observable<void> {
    return this.authRepo.resetPassword(token, password);
  }
}
```

**features/auth/domain/use-cases/check-permission.use-case.ts**
```typescript
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class CheckPermissionUseCase {
  constructor(@Inject(AUTH_REPOSITORY) private authRepo: IAuthRepository) {}

  execute(permission: string): Observable<boolean> {
    return this.authRepo.hasPermission(permission);
  }
}
```

---

### 7. Data Layer – DTOs, Datasource, Repositories

**features/auth/data/dtos/login-request.dto.ts**
```typescript
export interface LoginRequestDto {
  username: string;
  password: string;
}
```

**features/auth/data/dtos/login-response.dto.ts**
```typescript
export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    status: string;
    phoneNumber: string;
    profileImageUrl: string | null;
    role: string;
  };
}
```

**features/auth/data/datasources/auth.api.datasource.ts**
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { API_ENDPOINTS } from '../../../../core/constants/api.config';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiDataSource {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.login}`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logout}`, {});
  }

  refreshToken(): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {});
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.forgotPassword}`, { email });
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.resetPassword}`, { token, password });
  }

  getCurrentUser(): Observable<LoginResponseDto['user']> {
    return this.http.get<LoginResponseDto['user']>(`${this.baseUrl}${API_ENDPOINTS.auth.me}`);
  }

  getPermissions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}${API_ENDPOINTS.auth.permissions}`);
  }
}
```

**features/auth/data/repositories/auth.repository.impl.ts**
```typescript
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { User, LoginCredentials, AuthResponse } from '../../domain/entities/user.entity';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable()
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
```

**features/auth/data/repositories/auth.repository.demo.ts**
```typescript
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
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
```

---

### 8. Presentation – Layout

**features/auth/presentation/layouts/auth-layout/auth-layout.component.ts**
```typescript
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { LanguageSelectorComponent } from '../../../../../shared/i18n/presentation/pages/language-selector/language-selector.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TablerIconComponent, LanguageSelectorComponent],
  template: `
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="/" class="navbar-brand navbar-brand-autodark">
            <i-tabler name="layout-dashboard" class="navbar-brand-image"></i-tabler>
            iCmon
          </a>
        </div>
        <div class="text-end mb-2">
          <app-language-selector></app-language-selector>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {
  @HostBinding('class.page') pageClass = true;
}
```

---

### 9. Presentation – Pages (ตัวอย่าง Login, Sign Up, Forgot Password, Theme Settings)

เนื่องจากพื้นที่จำกัด ผมจะแสดงเฉพาะไฟล์ `.ts` และ `.html` สำหรับหน้า Login เป็นตัวอย่าง ส่วนหน้าที่เหลือจะมีโครงสร้างคล้ายกัน (ใช้ Use Cases และ Forms เหมือนเดิม) และสามารถดูได้จากไฟล์ที่ให้มาในโจทย์เดิม

**features/auth/presentation/pages/login/login.component.ts**
```typescript
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUseCase } from '../../../domain/use-cases/login.use-case';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, AppTranslatePipe],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private loginUseCase = inject(LoginUseCase);
  private router = inject(Router);

  username = '';
  password = '';
  loading = false;
  error = '';
  passwordVisible = false;
  rememberMe = false;

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.loginUseCase.execute({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Invalid username or password';
      }
    });
  }
}
```

**features/auth/presentation/pages/login/login.component.html**
```html
<div class="card card-md">
  <div class="card-body">
    <h2 class="h2 text-center mb-4">{{ 'login.title' | appTranslate }}</h2>
    <div *ngIf="error" class="alert alert-danger mb-3">{{ error }}</div>
    <form (ngSubmit)="onSubmit()" #loginForm="ngForm" autocomplete="off" novalidate>
      <div class="mb-3">
        <label class="form-label">{{ 'login.email' | appTranslate }}</label>
        <input type="text" class="form-control" [(ngModel)]="username" name="username" placeholder="admin" autocomplete="username">
      </div>
      <div class="mb-2">
        <label class="form-label">
          {{ 'login.password' | appTranslate }}
          <span class="form-label-description">
            <a routerLink="/forgot-password">{{ 'login.forgotPassword' | appTranslate }}</a>
          </span>
        </label>
        <div class="input-group input-group-flat">
          <input [type]="passwordVisible ? 'text' : 'password'" class="form-control" [(ngModel)]="password" name="password" placeholder="Password" autocomplete="current-password">
          <span class="input-group-text">
            <a href="javascript:void(0)" class="link-secondary" title="Show password" (click)="togglePassword()">
              <i-tabler [name]="passwordVisible ? 'eye-off' : 'eye'" class="icon"></i-tabler>
            </a>
          </span>
        </div>
      </div>
      <div class="mb-2">
        <label class="form-check">
          <input type="checkbox" class="form-check-input" [(ngModel)]="rememberMe" name="rememberMe">
          <span class="form-check-label">{{ 'login.rememberMe' | appTranslate }}</span>
        </label>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary w-100" [disabled]="loginForm.invalid || loading">
          <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ 'login.submit' | appTranslate }}
        </button>
      </div>
    </form>
  </div>
  <div class="hr-text">{{ 'login.or' | appTranslate }}</div>
  <div class="card-body">
    <div class="row">
      <div class="col">
        <a href="javascript:void(0)" class="btn w-100">
          <i-tabler name="brand-github" class="icon text-github icon-2 me-1"></i-tabler>
          Login with Github
        </a>
      </div>
      <div class="col">
        <a href="javascript:void(0)" class="btn w-100">
          <i-tabler name="brand-x" class="icon icon-2 me-1"></i-tabler>
          Login with X
        </a>
      </div>
    </div>
  </div>
</div>
<div class="text-center text-secondary mt-3">
  {{ 'login.noAccount' | appTranslate }} <a routerLink="/sign-up">{{ 'login.contactAdmin' | appTranslate }}</a>
</div>
<div class="text-center mt-3 p-2 bg-light rounded border">
  <small class="text-secondary">
    <strong>API:</strong> {{ 'login.testCredentials' | appTranslate }}
  </small>
</div>
```

**ไฟล์หน้า Sign Up, Forgot Password, Reset Password, Lock Screen, Two-Step ฯลฯ มีโครงสร้างคล้ายกัน โดยใช้ Use Cases และ Forms ตามที่กำหนด**

---

### 10. Theme Settings (ตรงกับภาพ Theme Builder)

**features/auth/presentation/pages/theme-settings/theme-settings.component.ts**
```typescript
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LayoutService, LayoutSettings } from '../../../../../core/services/layout.service';
import { TablerIconComponent } from 'angular-tabler-icons';
import { AppTranslatePipe } from '../../../../../shared/i18n/presentation/pipes/translate.pipe';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [NgFor, NgIf, TablerIconComponent, AppTranslatePipe],
  templateUrl: './theme-settings.component.html'
})
export class ThemeSettingsComponent {
  private layout = inject(LayoutService);
  get s(): LayoutSettings { return this.layout.snapshot; }

  layoutModes = [
    { value: 'vertical', label: 'layout.settings.layoutVertical' },
    { value: 'fluid', label: 'layout.settings.layoutFluid' },
    { value: 'boxed', label: 'layout.settings.layoutBoxed' },
    { value: 'condensed', label: 'layout.settings.layoutCondensed' },
  ];

  colorSchemes = [
    { value: 'blue', label: 'layout.settings.colorBlue' },
    { value: 'azure', label: 'layout.settings.colorAzure' },
    { value: 'indigo', label: 'layout.settings.colorIndigo' },
    { value: 'purple', label: 'layout.settings.colorPurple' },
    { value: 'pink', label: 'layout.settings.colorPink' },
    { value: 'red', label: 'layout.settings.colorRed' },
    { value: 'orange', label: 'layout.settings.colorOrange' },
    { value: 'yellow', label: 'layout.settings.colorYellow' },
    { value: 'lime', label: 'layout.settings.colorLime' },
    { value: 'green', label: 'layout.settings.colorGreen' },
    { value: 'teal', label: 'layout.settings.colorTeal' },
    { value: 'cyan', label: 'layout.settings.colorCyan' },
  ];

  fontFamilies = [
    { value: 'sans-serif', label: 'layout.settings.fontSansSerif' },
    { value: 'serif', label: 'layout.settings.fontSerif' },
    { value: 'monospace', label: 'layout.settings.fontMonospace' },
    { value: 'comic', label: 'layout.settings.fontComic' },
  ];

  themeBases = [
    { value: 'slate', label: 'layout.settings.themeSlate' },
    { value: 'gray', label: 'layout.settings.themeGray' },
    { value: 'zinc', label: 'layout.settings.themeZinc' },
    { value: 'neutral', label: 'layout.settings.themeNeutral' },
    { value: 'stone', label: 'layout.settings.themeStone' },
  ];

  radiusOptions = [0, 0.5, 1, 1.5, 2];

  update(key: keyof LayoutSettings, value: any): void {
    this.layout.update({ [key]: value });
  }

  reset(): void {
    this.layout.reset();
  }

  toggle(key: keyof LayoutSettings): void {
    this.layout.update({ [key]: !this.s[key] });
  }
}
```

**features/auth/presentation/pages/theme-settings/theme-settings.component.html**
```html
<div class="page-body">
  <div class="container-xl">
    <div class="page-header d-print-none mb-4">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">{{ 'layout.settings.title' | appTranslate }}</h2>
          <div class="text-muted mt-1">{{ 'dashboard.subtitle' | appTranslate }}</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <!-- Layout Mode -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">{{ 'layout.settings.layoutMode' | appTranslate }}</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.layoutMode' | appTranslate }}</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let m of layoutModes" type="button" class="btn"
                        [class.btn-primary]="s.layoutMode === m.value"
                        [class.btn-outline-primary]="s.layoutMode !== m.value"
                        (click)="update('layoutMode', m.value)">
                  {{ m.label | appTranslate }}
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.navbarPosition' | appTranslate }}</label>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn"
                        [class.btn-primary]="s.navbarPosition === 'left'"
                        [class.btn-outline-primary]="s.navbarPosition !== 'left'"
                        (click)="update('navbarPosition', 'left')">
                  {{ 'layout.settings.navbarLeft' | appTranslate }}
                </button>
                <button type="button" class="btn"
                        [class.btn-primary]="s.navbarPosition === 'right'"
                        [class.btn-outline-primary]="s.navbarPosition !== 'right'"
                        (click)="update('navbarPosition', 'right')">
                  {{ 'layout.settings.navbarRight' | appTranslate }}
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarDark" (change)="toggle('navbarDark')">
                <span class="form-check-label">{{ 'layout.settings.navbarDark' | appTranslate }}</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarOverlap" (change)="toggle('navbarOverlap')">
                <span class="form-check-label">{{ 'layout.settings.navbarOverlap' | appTranslate }}</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarSticky" (change)="toggle('navbarSticky')">
                <span class="form-check-label">{{ 'layout.settings.navbarSticky' | appTranslate }}</span>
              </label>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" [checked]="s.rtlMode" (change)="toggle('rtlMode')">
                <span class="form-check-label">{{ 'layout.settings.rtlMode' | appTranslate }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Color Scheme & Fonts -->
        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">{{ 'layout.settings.colorScheme' | appTranslate }}</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.colorScheme' | appTranslate }}</label>
              <div class="row g-2">
                <div class="col-auto" *ngFor="let c of colorSchemes">
                  <a href="javascript:void(0)" class="btn btn-icon rounded-circle"
                     [style.background]="'var(--tblr-' + c.value + ')'"
                     [class.btn-primary]="s.colorScheme === c.value"
                     [class.btn-outline-primary]="s.colorScheme !== c.value"
                     (click)="update('colorScheme', c.value)"
                     [title]="c.label | appTranslate">
                  </a>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.fontFamily' | appTranslate }}</label>
              <select class="form-select" [value]="s.fontFamily" (change)="update('fontFamily', $any($event.target).value)">
                <option *ngFor="let f of fontFamilies" [value]="f.value">{{ f.label | appTranslate }}</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.themeBase' | appTranslate }}</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let b of themeBases" type="button" class="btn btn-sm"
                        [class.btn-primary]="s.themeBase === b.value"
                        [class.btn-outline-primary]="s.themeBase !== b.value"
                        (click)="update('themeBase', b.value)">
                  {{ b.label | appTranslate }}
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.borderRadius' | appTranslate }} ({{ s.borderRadius }})</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let r of radiusOptions" type="button" class="btn btn-sm"
                        [class.btn-primary]="s.borderRadius === r"
                        [class.btn-outline-primary]="s.borderRadius !== r"
                        (click)="update('borderRadius', r)">
                  {{ r }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">{{ 'common.view' | appTranslate }}</h3>
          </div>
          <div class="card-body text-center py-5">
            <i-tabler name="palette" class="text-muted mb-3" size="64"></i-tabler>
            <p class="text-muted">{{ 'common.loading' | appTranslate }}</p>
            <button type="button" class="btn btn-outline-danger w-100" (click)="reset()">
              <i-tabler name="refresh" class="me-1" size="16"></i-tabler>
              {{ 'layout.settings.reset' | appTranslate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 11. Routing Configuration

**app/app.routes.ts**
```typescript
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/auth/presentation/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/presentation/pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'sign-up', loadComponent: () => import('./features/auth/presentation/pages/sign-up/sign-up.component').then(m => m.SignUpComponent) },
      { path: 'forgot-password', loadComponent: () => import('./features/auth/presentation/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./features/auth/presentation/pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
      { path: 'lock-screen', loadComponent: () => import('./features/auth/presentation/pages/lock-screen/lock-screen.component').then(m => m.LockScreenComponent) },
      { path: 'two-step-verification', loadComponent: () => import('./features/auth/presentation/pages/two-step-verification/two-step-verification.component').then(m => m.TwoStepVerificationComponent) },
      { path: 'two-step-code', loadComponent: () => import('./features/auth/presentation/pages/two-step-code/two-step-code.component').then(m => m.TwoStepCodeComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/auth/presentation/pages/user-list/user-list.routes').then(m => m.USER_ROUTES)
  },
  {
    path: 'settings/theme',
    loadComponent: () => import('./features/auth/presentation/pages/theme-settings/theme-settings.component').then(m => m.ThemeSettingsComponent)
  },
  // ... routes อื่น ๆ สำหรับ dashboard, etc.
];
```

---

### 12. App Configuration (Standalone)

**app/app.config.ts**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconLayoutDashboard, IconEye, IconEyeOff, IconBrandGithub, IconBrandX, IconPlus, IconPencil, IconTrash, IconPalette, IconRefresh } from 'angular-tabler-icons/icons';
import { routes } from './app.routes';
import { AUTH_REPOSITORY } from './core/di/tokens';
import { AuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.impl';
import { DemoAuthRepositoryImpl } from './features/auth/data/repositories/auth.repository.demo';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTablerIcons({ IconLayoutDashboard, IconEye, IconEyeOff, IconBrandGithub, IconBrandX, IconPlus, IconPencil, IconTrash, IconPalette, IconRefresh }),
    { provide: AUTH_REPOSITORY, useClass: environment.demo ? DemoAuthRepositoryImpl : AuthRepositoryImpl }
  ]
};
```

**app/app.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
```

---

### 13. i18n JSON Files

**assets/i18n/en.json**
```json
{
  "login": {
    "title": "Login to your account",
    "email": "Username / Email",
    "password": "Password",
    "forgotPassword": "Forgot password?",
    "rememberMe": "Remember me",
    "submit": "Sign in",
    "or": "or",
    "noAccount": "Don't have account yet?",
    "contactAdmin": "Sign Up",
    "testCredentials": "Use admin / P@ssw0rd for demo"
  },
  "auth": {
    "forgotPassword": {
      "title": "Forgot Password",
      "description": "Enter your email address and your password will be reset and emailed to you.",
      "submit": "Send E-mail",
      "backToLogin": "Forget it, send me back to the sign in screen.",
      "successMessage": "Password reset link sent to your email."
    },
    "signUp": {
      "title": "Create new account",
      "nameLabel": "Full Name",
      "namePlaceholder": "Enter your full name",
      "emailLabel": "Email",
      "emailPlaceholder": "your@email.com",
      "passwordLabel": "Password",
      "passwordPlaceholder": "Password",
      "confirmPasswordLabel": "Confirm Password",
      "confirmPasswordPlaceholder": "Confirm Password",
      "agreeTerms": "Agree the terms and policy",
      "termsLink": "Terms",
      "submit": "Create new account",
      "hasAccount": "Already have account?",
      "loginLink": "Sign in"
    },
    "resetPassword": {
      "title": "Reset Password",
      "newPassword": "New Password",
      "newPasswordPlaceholder": "Enter new password",
      "confirmPassword": "Confirm Password",
      "confirmPasswordPlaceholder": "Confirm new password",
      "submit": "Reset Password",
      "successMessage": "Password reset successfully.",
      "backToLogin": "Back to login"
    }
  },
  "layout": {
    "settings": {
      "title": "Theme Builder",
      "layoutMode": "Layout mode",
      "layoutVertical": "Vertical",
      "layoutFluid": "Fluid",
      "layoutBoxed": "Boxed",
      "layoutCondensed": "Condensed",
      "navbarPosition": "Navbar position",
      "navbarLeft": "Left",
      "navbarRight": "Right",
      "navbarDark": "Dark navbar",
      "navbarOverlap": "Overlap navbar",
      "navbarSticky": "Sticky navbar",
      "rtlMode": "RTL mode",
      "colorScheme": "Color scheme",
      "colorBlue": "Blue",
      "colorAzure": "Azure",
      "colorIndigo": "Indigo",
      "colorPurple": "Purple",
      "colorPink": "Pink",
      "colorRed": "Red",
      "colorOrange": "Orange",
      "colorYellow": "Yellow",
      "colorLime": "Lime",
      "colorGreen": "Green",
      "colorTeal": "Teal",
      "colorCyan": "Cyan",
      "fontFamily": "Font family",
      "fontSansSerif": "Sans-serif",
      "fontSerif": "Serif",
      "fontMonospace": "Monospace",
      "fontComic": "Comic",
      "themeBase": "Theme base",
      "themeSlate": "Slate",
      "themeGray": "Gray",
      "themeZinc": "Zinc",
      "themeNeutral": "Neutral",
      "themeStone": "Stone",
      "borderRadius": "Corner Radius",
      "reset": "Reset to default"
    }
  },
  "common": {
    "view": "Preview",
    "loading": "Loading..."
  }
}
```

**assets/i18n/th.json** (แปลภาษาไทยตามต้องการ)

---

## ✅ สรุป

ระบบนี้ประกอบด้วย:
- **Clean Architecture**: แยก Domain, Data, Presentation
- **Standalone Components**: ทั้งหมดใช้ `standalone: true`
- **Demo Repository**: ใช้ `environment.demo` สลับได้
- **Theme Builder**: ครบถ้วนตามภาพ (Layout Mode, Color Scheme, Font, Theme Base, Corner Radius)
- **i18n**: รองรับหลายภาษา (ใช้ Translate Pipe และ Language Selector)
- **Routing**: แยก AuthLayout (ไม่มี Sidebar) และ AppLayout (สำหรับหน้าหลัง login)

**คำสั่งให้ AI สร้างทั้งหมด** (Prompt) ที่ใช้สามารถนำไปรันกับ AI อื่น ๆ ได้โดยตรง

หากต้องการเพิ่มเติมหรือปรับแต่งส่วนใด สามารถแจ้งได้ครับ
