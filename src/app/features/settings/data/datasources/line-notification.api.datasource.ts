import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { LineNotificationResponseDto } from '../dtos/line-notification-response.dto';

@Injectable({ providedIn: 'root' })
export class LineNotificationApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LineNotificationResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: LineNotificationResponseDto[]; total: number }>(this.endpoint(API_ENDPOINTS.settings.lineNotifications.list), { params: httpParams });
  }

  getById(id: string): Observable<LineNotificationResponseDto> {
    return this.http.get<LineNotificationResponseDto>(this.endpoint(API_ENDPOINTS.settings.lineNotifications.detail(id)));
  }

  create(data: Partial<LineNotificationResponseDto>): Observable<LineNotificationResponseDto> {
    return this.http.post<LineNotificationResponseDto>(this.endpoint(API_ENDPOINTS.settings.lineNotifications.create), data);
  }

  update(id: string, data: Partial<LineNotificationResponseDto>): Observable<LineNotificationResponseDto> {
    return this.http.put<LineNotificationResponseDto>(this.endpoint(API_ENDPOINTS.settings.lineNotifications.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.settings.lineNotifications.delete(id)));
  }
}
