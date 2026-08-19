import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiSettingResponseDto } from '../dtos/api-setting-response.dto';

@Injectable({ providedIn: 'root' })
export class ApiSettingApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ApiSettingResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: ApiSettingResponseDto[]; total: number }>(API_ENDPOINTS.settings.apiSettings.list, { params: httpParams });
  }

  getById(id: string): Observable<ApiSettingResponseDto> {
    return this.http.get<ApiSettingResponseDto>(API_ENDPOINTS.settings.apiSettings.detail(id));
  }

  create(data: Partial<ApiSettingResponseDto>): Observable<ApiSettingResponseDto> {
    return this.http.post<ApiSettingResponseDto>(API_ENDPOINTS.settings.apiSettings.create, data);
  }

  update(id: string, data: Partial<ApiSettingResponseDto>): Observable<ApiSettingResponseDto> {
    return this.http.put<ApiSettingResponseDto>(API_ENDPOINTS.settings.apiSettings.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.apiSettings.delete(id));
  }
}
