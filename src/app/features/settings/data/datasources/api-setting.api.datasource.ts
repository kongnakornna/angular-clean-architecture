import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { ApiSettingResponseDto } from '../dtos/api-setting-response.dto';

@Injectable({ providedIn: 'root' })
export class ApiSettingApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ApiSettingResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: ApiSettingResponseDto[]; total: number }>(this.endpoint(API_ENDPOINTS.settings.apiSettings.list), { params: httpParams });
  }

  getById(id: string): Observable<ApiSettingResponseDto> {
    return this.http.get<ApiSettingResponseDto>(this.endpoint(API_ENDPOINTS.settings.apiSettings.detail(id)));
  }

  create(data: Partial<ApiSettingResponseDto>): Observable<ApiSettingResponseDto> {
    return this.http.post<ApiSettingResponseDto>(this.endpoint(API_ENDPOINTS.settings.apiSettings.create), data);
  }

  update(id: string, data: Partial<ApiSettingResponseDto>): Observable<ApiSettingResponseDto> {
    return this.http.put<ApiSettingResponseDto>(this.endpoint(API_ENDPOINTS.settings.apiSettings.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.apiSettings.delete(id)));
  }
}
