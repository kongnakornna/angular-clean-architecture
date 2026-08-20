import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendAdapter, LoginPayload, LoginResult } from './backend-adapter.interface';

@Injectable({ providedIn: 'root' })
export class NodeBackend3003Adapter implements BackendAdapter {
  readonly name = 'node-backend-3003';
  readonly baseUrl = 'http://localhost:3003';

  private http = inject(HttpClient);

  login(payload: LoginPayload): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.baseUrl}/v1/auth/signin`, {
      email: payload.username,
      password: payload.password,
    });
  }

  healthCheck(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/health`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
