import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { TokenResponseDto } from '../dtos/token-response.dto';

@Injectable({ providedIn: 'root' })
export class TokenApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: TokenResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: TokenResponseDto[]; total: number }>(API_ENDPOINTS.settings.tokens.list, { params: httpParams });
  }

  getById(id: string): Observable<TokenResponseDto> {
    return this.http.get<TokenResponseDto>(API_ENDPOINTS.settings.tokens.detail(id));
  }

  create(data: Partial<TokenResponseDto>): Observable<TokenResponseDto> {
    return this.http.post<TokenResponseDto>(API_ENDPOINTS.settings.tokens.create, data);
  }

  revoke(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.tokens.revoke(id));
  }
}
