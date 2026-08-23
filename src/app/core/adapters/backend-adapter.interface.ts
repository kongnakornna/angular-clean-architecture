import { Observable } from 'rxjs';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface BackendAdapter {
  readonly name: string;
  readonly baseUrl: string;
  login(payload: LoginPayload): Observable<LoginResult>;
  healthCheck(): Observable<boolean>;
}
