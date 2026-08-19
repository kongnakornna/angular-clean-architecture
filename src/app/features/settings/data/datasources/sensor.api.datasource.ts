import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { SensorResponseDto } from '../dtos/sensor-response.dto';

@Injectable({ providedIn: 'root' })
export class SensorApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: SensorResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: SensorResponseDto[]; total: number }>(API_ENDPOINTS.settings.sensors.list, { params: httpParams });
  }

  getById(id: string): Observable<SensorResponseDto> {
    return this.http.get<SensorResponseDto>(API_ENDPOINTS.settings.sensors.detail(id));
  }

  create(data: Partial<SensorResponseDto>): Observable<SensorResponseDto> {
    return this.http.post<SensorResponseDto>(API_ENDPOINTS.settings.sensors.create, data);
  }

  update(id: string, data: Partial<SensorResponseDto>): Observable<SensorResponseDto> {
    return this.http.put<SensorResponseDto>(API_ENDPOINTS.settings.sensors.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.sensors.delete(id));
  }
}
