import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BackendAdapter, LoginPayload, LoginResult } from './backend-adapter.interface';

@Injectable({ providedIn: 'root' })
export class PythonBackend8000Adapter implements BackendAdapter {
  readonly name = 'python-backend-8000';
  readonly baseUrl = 'http://localhost:8000';

  private http = inject(HttpClient);

  login(payload: LoginPayload): Observable<LoginResult> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', payload.username)
      .set('password', payload.password)
      .set('scope', '')
      .set('client_id', 'string')
      .set('client_secret', 'string');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    return this.http.post<LoginResult>(`${this.baseUrl}/api/v1/authentication/login/`, body.toString(), { headers });
  }

  healthCheck(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/api/v1/health`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
