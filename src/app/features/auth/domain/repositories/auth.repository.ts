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
