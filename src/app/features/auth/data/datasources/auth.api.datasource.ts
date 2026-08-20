// auth-api.data-source.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from '@angular/common/http';
import { Observable, throwError, timeout, retry } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../../../core/config/app.config';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { ChangePasswordRequestDto } from '../dtos/change-password-request.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { PublicKeyResponseDto } from '../dtos/public-key-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { SignInRequestDto } from '../dtos/signin-request.dto';
import { RoleResponseDto, RoleListResponseDto, CreateRoleRequestDto, UpdateRoleRequestDto, AssignRolePermissionsRequestDto } from '../dtos/role.dto';
import { PermissionListResponseDto } from '../dtos/permission.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiDataSource {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly fallbackService = inject(ApiFallbackService);
  private readonly httpBackend = inject(HttpBackend);
  private readonly httpWithoutInterceptor = new HttpClient(this.httpBackend);

  private readonly DEFAULT_TIMEOUT = 30000;
  private readonly DEFAULT_RETRY = 2;

  private get baseUrl(): string {
    return this.fallbackService.getActiveBaseUrl();
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const body = error.error as { error?: { msg?: string }; msg?: string; message?: string };
    const serverMsg = body?.error?.msg || body?.msg || body?.message || null;
    let errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      if (serverMsg) {
        errorMessage = serverMsg;
      } else {
        errorMessage = `Server Error (${error.status}): ${error.message}`;
      }

      if (error.status === 401) {
        errorMessage = 'ไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบอีกครั้ง';
      } else if (error.status === 403) {
        errorMessage = 'คุณไม่มีสิทธิ์เข้าถึง';
      } else if (error.status === 404) {
        errorMessage = 'ไม่พบข้อมูลที่ร้องขอ';
      } else if (error.status === 0) {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบเครือข่าย';
      }
    }

    const appError = new Error(errorMessage) as Error & { status?: number };
    appError.status = error.status;

    // เก็บ log error ไว้เพื่อดีบัก (ถ้าต้องการเอาออกก็ลบได้)
    console.error('[AuthApiDataSource] HTTP Error:', errorMessage, error);
    return throwError(() => appError);
  }

  private getOptions(additionalHeaders?: Record<string, string>): {
    headers: HttpHeaders;
    withCredentials: boolean;
    responseType: 'json';
  } {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
    }

    return {
      headers,
      withCredentials: true,
      responseType: 'json' as const,
    };
  }

  // ------------------------------------------------------------
  // API Methods
  // ------------------------------------------------------------
  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    const adapter = this.fallbackService.getActiveAdapter();
    if (adapter) {
      return adapter.login({ username: data.username, password: data.password }).pipe(
        map((raw) => ({
          accessToken: raw.access_token,
          refreshToken: raw.refresh_token,
          expiresIn: raw.expires_in,
          tokenType: raw.token_type,
          user: null,
        })),
        catchError(this.handleError)
      );
    }

    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.auth.login}`, data, this.getOptions())
      .pipe(
        timeout(this.DEFAULT_TIMEOUT),
        retry(this.DEFAULT_RETRY),
        map((raw) => ({
          accessToken: raw.access_token,
          refreshToken: raw.refresh_token,
          expiresIn: raw.expires_in,
          tokenType: raw.token_type,
          user: raw.user || null,
        })),
        catchError(this.handleError)
      );
  }

  signIn(data: SignInRequestDto): Observable<LoginResponseDto> {
    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.auth.signin}`, data, this.getOptions())
      .pipe(
        timeout(this.DEFAULT_TIMEOUT),
        retry(this.DEFAULT_RETRY),
        map((raw) => ({
          accessToken: raw.access_token,
          refreshToken: raw.refresh_token,
          expiresIn: raw.expires_in,
          tokenType: raw.token_type,
          user: raw.user || null,
        })),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logout}`, {}, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  logoutAll(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logoutall}`, {}, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  refreshToken(): Observable<LoginResponseDto> {
    return this.httpWithoutInterceptor
      .post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {}, this.getOptions())
      .pipe(timeout(this.DEFAULT_TIMEOUT), retry(1), catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.forgotPassword}`, { email }, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  resetPassword(code: string, data: ResetPasswordRequestDto): Observable<void> {
    const params = this.buildParams({ code });
    return this.http
      .patch<void>(`${this.baseUrl}${API_ENDPOINTS.auth.resetPassword}`, data, {
        ...this.getOptions(),
        params,
      })
      .pipe(catchError(this.handleError));
  }

  verifyEmail(code: string): Observable<string> {
    const params = this.buildParams({ code });
    return this.http
      .get<string>(`${this.baseUrl}${API_ENDPOINTS.auth.verifyEmail}`, {
        ...this.getOptions(),
        params,
        responseType: 'text' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  getPublicKey(): Observable<PublicKeyResponseDto> {
    return this.http
      .get<PublicKeyResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.publicKey}`, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  getCurrentUser(): Observable<UserResponseDto> {
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.auth.me}`, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  updateProfile(data: Partial<UserResponseDto>): Observable<UserResponseDto> {
    return this.http
      .put<any>(`${this.baseUrl}${API_ENDPOINTS.users.updateMe}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  changeMyPassword(data: ChangePasswordRequestDto): Observable<void> {
    const body = {
      old_password: data.currentPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    };
    return this.http
      .patch<void>(`${this.baseUrl}${API_ENDPOINTS.users.changeMyPassword}`, body, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  register(data: RegisterRequestDto): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.register}`, data, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  getPermissions(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}${API_ENDPOINTS.auth.permissions}`, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  // ------------------------------------------------------------
  // Admin user management
  // ------------------------------------------------------------
  listUsers(params?: {
    limit?: number;
    offset?: number;
    email?: string;
    username?: string;
    status?: string;
    roleId?: string;
  }): Observable<{ data: UserResponseDto[]; total: number }> {
    const { roleId, ...rest } = params || {};
    const queryParams = {
      ...rest,
      ...(roleId !== undefined && roleId !== null && roleId !== '' ? { role_id: roleId } : {}),
    };
    const httpParams = this.buildParams(queryParams);
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.users.list}`, {
        ...this.getOptions(),
        params: httpParams,
      })
      .pipe(
        map((raw) => {
          const body = raw?.data ?? raw;
          const payload = body?.payload ?? body;
          const total = body?.pagination?.total ?? (Array.isArray(payload) ? payload.length : 0);
          return { data: payload || [], total };
        }),
        catchError(this.handleError)
      );
  }

  getUserById(id: string): Observable<UserResponseDto> {
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.users.detail(id)}`, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  createUser(data: RegisterRequestDto): Observable<UserResponseDto> {
    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.users.create}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  updateUser(id: string, data: Partial<UserResponseDto>): Observable<UserResponseDto> {
    return this.http
      .put<any>(`${this.baseUrl}${API_ENDPOINTS.users.update(id)}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}${API_ENDPOINTS.users.delete(id)}`, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  updateUserRole(id: string, roleId: number): Observable<void> {
    return this.http
      .patch<void>(`${this.baseUrl}${API_ENDPOINTS.users.updateRole(id)}`, { role_id: roleId }, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<void> {
    return this.http
      .patch<void>(
        `${this.baseUrl}${API_ENDPOINTS.users.updatePassword(id)}`,
        { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword },
        this.getOptions()
      )
      .pipe(catchError(this.handleError));
  }

  forceLogoutUser(id: string): Observable<void> {
    return this.http
      .get<void>(`${this.baseUrl}${API_ENDPOINTS.users.logoutall(id)}`, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  // Role CRUD
  getRoles(): Observable<RoleListResponseDto> {
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.roles.list}`, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  getRole(id: number): Observable<RoleResponseDto> {
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.roles.detail(id)}`, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  createRole(data: CreateRoleRequestDto): Observable<RoleResponseDto> {
    return this.http
      .post<any>(`${this.baseUrl}${API_ENDPOINTS.roles.create}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  updateRole(id: number, data: UpdateRoleRequestDto): Observable<RoleResponseDto> {
    return this.http
      .patch<any>(`${this.baseUrl}${API_ENDPOINTS.roles.update(id)}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  deleteRole(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}${API_ENDPOINTS.roles.delete(id)}`, this.getOptions())
      .pipe(catchError(this.handleError));
  }

  assignRolePermissions(id: number, data: AssignRolePermissionsRequestDto): Observable<RoleResponseDto> {
    return this.http
      .patch<any>(`${this.baseUrl}${API_ENDPOINTS.roles.permissions(id)}`, data, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }

  getAllPermissions(): Observable<PermissionListResponseDto> {
    return this.http
      .get<any>(`${this.baseUrl}${API_ENDPOINTS.permissions.list}`, this.getOptions())
      .pipe(
        map((raw) => raw?.data ?? raw),
        catchError(this.handleError)
      );
  }
}
