import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { NodeRedResponseDto } from '../dtos/nodered-response.dto';

@Injectable({ providedIn: 'root' })
export class NodeRedApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: NodeRedResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: NodeRedResponseDto[]; total: number }>(API_ENDPOINTS.settings.nodered.list, { params: httpParams });
  }

  getById(id: string): Observable<NodeRedResponseDto> {
    return this.http.get<NodeRedResponseDto>(API_ENDPOINTS.settings.nodered.detail(id));
  }

  create(data: Partial<NodeRedResponseDto>): Observable<NodeRedResponseDto> {
    return this.http.post<NodeRedResponseDto>(API_ENDPOINTS.settings.nodered.create, data);
  }

  update(id: string, data: Partial<NodeRedResponseDto>): Observable<NodeRedResponseDto> {
    return this.http.put<NodeRedResponseDto>(API_ENDPOINTS.settings.nodered.update(id), data);
  }

  testConnection(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.get<{ success: boolean; message: string }>(API_ENDPOINTS.settings.nodered.testConnection(id));
  }
}
