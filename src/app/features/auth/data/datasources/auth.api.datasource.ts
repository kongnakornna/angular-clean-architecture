import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../../../core/config/app.config';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { ChangePasswordRequestDto } from '../dtos/change-password-request.dto';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { PublicKeyResponseDto } from '../dtos/public-key-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { SignInRequestDto } from '../dtos/signin-request.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiDataSource {
  private http = inject(HttpClient);
  private readonly baseUrl: string;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.baseUrl = config.apiBaseUrl;
  }

  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.login}`, data);
  }

  signIn(data: SignInRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.signin}`, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logout}`, {});
  }

  logoutAll(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.logoutall}`, {});
  }

  refreshToken(): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.refresh}`, {});
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.forgotPassword}`, { email });
  }

  resetPassword(code: string, data: ResetPasswordRequestDto): Observable<void> {
    const params = new HttpParams().set('code', code);
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.auth.resetPassword}`, data, { params });
  }

  verifyEmail(code: string): Observable<string> {
    const params = new HttpParams().set('code', code);
    return this.http.get<string>(`${this.baseUrl}${API_ENDPOINTS.auth.verifyEmail}`, { params, responseType: 'text' as 'json' });
  }

  getPublicKey(): Observable<PublicKeyResponseDto> {
    return this.http.get<PublicKeyResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.publicKey}`);
  }

  getCurrentUser(): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.baseUrl}${API_ENDPOINTS.auth.me}`);
  }

  updateProfile(data: Partial<UserResponseDto>): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.baseUrl}${API_ENDPOINTS.users.updateMe}`, data);
  }

  changeMyPassword(data: ChangePasswordRequestDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.users.changeMyPassword}`, data);
  }

  register(data: RegisterRequestDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.auth.register}`, data);
  }

  getPermissions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}${API_ENDPOINTS.auth.permissions}`);
  }

  // Admin user management
  listUsers(params?: { limit?: number; offset?: number; email?: string; username?: string; status?: string; roleId?: string }): Observable<{ data: UserResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<{ data: UserResponseDto[]; total: number }>(`${this.baseUrl}${API_ENDPOINTS.users.list}`, { params: httpParams });
  }

  getUserById(id: string): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.baseUrl}${API_ENDPOINTS.users.detail(id)}`);
  }

  createUser(data: RegisterRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}${API_ENDPOINTS.users.create}`, data);
  }

  updateUser(id: string, data: Partial<UserResponseDto>): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.baseUrl}${API_ENDPOINTS.users.update(id)}`, data);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${API_ENDPOINTS.users.delete(id)}`);
  }

  updateUserRole(id: string, roleId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.users.updateRole(id)}`, { roleId });
  }

  updateUserPassword(id: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}${API_ENDPOINTS.users.updatePassword(id)}`, { oldPassword, newPassword, confirmPassword });
  }

  forceLogoutUser(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_ENDPOINTS.users.logoutall(id)}`, {});
  }
}
