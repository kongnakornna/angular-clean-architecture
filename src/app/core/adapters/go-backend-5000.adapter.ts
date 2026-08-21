import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendAdapter, LoginPayload, LoginResult } from './backend-adapter.interface';
import { APP_CONFIG } from '../config/app.config';

@Injectable({ providedIn: 'root' })
export class GoBackend5000Adapter implements BackendAdapter {
  readonly name = 'go-backend-5000';
  readonly baseUrl = 'http://localhost:5000';

  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  private get apiBase(): string {
    return this.cfg.useProxy ? '' : this.baseUrl;
  }

  login(payload: LoginPayload): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.apiBase}/api/auth/login`, {
      username: payload.username,
      password: payload.password,
    });
  }

  healthCheck(): Observable<boolean> {
    return this.http.get(`${this.apiBase}/api/health`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
