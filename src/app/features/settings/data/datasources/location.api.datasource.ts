import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { LocationResponseDto } from '../dtos/location-response.dto';

@Injectable({ providedIn: 'root' })
export class LocationApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LocationResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: LocationResponseDto[]; total: number }>(this.endpoint(API_ENDPOINTS.settings.locations.list), { params: httpParams });
  }

  getById(id: string): Observable<LocationResponseDto> {
    return this.http.get<LocationResponseDto>(this.endpoint(API_ENDPOINTS.settings.locations.detail(id)));
  }

  create(data: Partial<LocationResponseDto>): Observable<LocationResponseDto> {
    return this.http.post<LocationResponseDto>(this.endpoint(API_ENDPOINTS.settings.locations.create), data);
  }

  update(id: string, data: Partial<LocationResponseDto>): Observable<LocationResponseDto> {
    return this.http.put<LocationResponseDto>(this.endpoint(API_ENDPOINTS.settings.locations.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.locations.delete(id)));
  }
}
