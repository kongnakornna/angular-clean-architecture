import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthApiDataSource {
  constructor(private http: HttpClient) {}

  login(data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API_ENDPOINTS.auth.login, data);
  }

  logout(): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.auth.logout, {});
  }

  refreshToken(): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API_ENDPOINTS.auth.refresh, {});
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.auth.forgotPassword, { email });
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.auth.resetPassword, { token, password });
  }

  getCurrentUser(): Observable<LoginResponseDto['user']> {
    return this.http.get<LoginResponseDto['user']>(API_ENDPOINTS.auth.me);
  }

  getPermissions(): Observable<string[]> {
    return this.http.get<string[]>(API_ENDPOINTS.auth.permissions);
  }
}
