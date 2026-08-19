import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { HostResponseDto } from '../dtos/host-response.dto';

@Injectable({ providedIn: 'root' })
export class HostApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: HostResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: HostResponseDto[]; total: number }>(API_ENDPOINTS.settings.hosts.list, { params: httpParams });
  }

  getById(id: string): Observable<HostResponseDto> {
    return this.http.get<HostResponseDto>(API_ENDPOINTS.settings.hosts.detail(id));
  }

  create(data: Partial<HostResponseDto>): Observable<HostResponseDto> {
    return this.http.post<HostResponseDto>(API_ENDPOINTS.settings.hosts.create, data);
  }

  update(id: string, data: Partial<HostResponseDto>): Observable<HostResponseDto> {
    return this.http.put<HostResponseDto>(API_ENDPOINTS.settings.hosts.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.hosts.delete(id));
  }
}
