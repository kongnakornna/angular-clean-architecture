import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { LocationResponseDto } from '../dtos/location-response.dto';

@Injectable({ providedIn: 'root' })
export class LocationApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LocationResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: LocationResponseDto[]; total: number }>(API_ENDPOINTS.settings.locations.list, { params: httpParams });
  }

  getById(id: string): Observable<LocationResponseDto> {
    return this.http.get<LocationResponseDto>(API_ENDPOINTS.settings.locations.detail(id));
  }

  create(data: Partial<LocationResponseDto>): Observable<LocationResponseDto> {
    return this.http.post<LocationResponseDto>(API_ENDPOINTS.settings.locations.create, data);
  }

  update(id: string, data: Partial<LocationResponseDto>): Observable<LocationResponseDto> {
    return this.http.put<LocationResponseDto>(API_ENDPOINTS.settings.locations.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.locations.delete(id));
  }
}
