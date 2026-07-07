import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
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
