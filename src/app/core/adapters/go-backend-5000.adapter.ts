import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendAdapter, LoginPayload, LoginResult } from './backend-adapter.interface';

@Injectable({ providedIn: 'root' })
export class GoBackend5000Adapter implements BackendAdapter {
  readonly name = 'go-backend-5000';
  readonly baseUrl = 'http://localhost:5000';

  private http = inject(HttpClient);

  login(payload: LoginPayload): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.baseUrl}/api/auth/login`, {
      username: payload.username,
      password: payload.password,
    });
  }

  healthCheck(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/api/health`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
