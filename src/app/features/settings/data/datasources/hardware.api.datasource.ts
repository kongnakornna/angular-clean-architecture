import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { HardwareResponseDto } from '../dtos/hardware-response.dto';

@Injectable({ providedIn: 'root' })
export class HardwareApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: HardwareResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: HardwareResponseDto[]; total: number }>(this.endpoint(API_ENDPOINTS.settings.hardware.list), { params: httpParams });
  }

  getById(id: string): Observable<HardwareResponseDto> {
    return this.http.get<HardwareResponseDto>(this.endpoint(API_ENDPOINTS.settings.hardware.detail(id)));
  }

  create(data: Partial<HardwareResponseDto>): Observable<HardwareResponseDto> {
    return this.http.post<HardwareResponseDto>(this.endpoint(API_ENDPOINTS.settings.hardware.create), data);
  }

  update(id: string, data: Partial<HardwareResponseDto>): Observable<HardwareResponseDto> {
    return this.http.put<HardwareResponseDto>(this.endpoint(API_ENDPOINTS.settings.hardware.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.hardware.delete(id)));
  }
}
