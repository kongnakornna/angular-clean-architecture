import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, map, take, switchMap } from 'rxjs/operators';
import { APP_CONSTANTS } from '../constants/app.constants';
import { APP_CONFIG, AppConfig } from '../config/app.config';
import { API_ENDPOINTS } from '../config/api.config';
import { LoginResponseDto } from '../../features/auth/data/dtos/login-response.dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(APP_CONSTANTS.TOKEN_KEY);
    const isRefreshRequest = req.url.includes(API_ENDPOINTS.auth.refresh);

    if (token && !isRefreshRequest) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        // Check for 401 status on both HttpErrorResponse and plain objects
        // (ErrorInterceptor transforms errors to plain objects before this interceptor)
        const status = error?.status || error?.statusCode;
        if (status === 401 && !isRefreshRequest) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem(APP_CONSTANTS.REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        this.logout();
        return throwError(() => new Error('No refresh token'));
      }

      return this.refreshToken(refreshToken).pipe(
        switchMap((token: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, token);
          return next.handle(
            request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          );
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(
            request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          )
        )
      );
    }
  }

  private refreshToken(refreshToken: string): Observable<string> {
    return this.http.post<LoginResponseDto>(
      `${this.config.apiBaseUrl}${API_ENDPOINTS.auth.refresh}`,
      { refreshToken }
    ).pipe(
      map((response) => {
        if (response.refreshToken) {
          localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, response.refreshToken);
        }
        return response.accessToken;
      })
    );
  }

  private logout(): void {
    localStorage.removeItem(APP_CONSTANTS.TOKEN_KEY);
    localStorage.removeItem(APP_CONSTANTS.REFRESH_TOKEN_KEY);
    localStorage.removeItem(APP_CONSTANTS.USER_KEY);
    window.location.href = '/login';
  }
}
