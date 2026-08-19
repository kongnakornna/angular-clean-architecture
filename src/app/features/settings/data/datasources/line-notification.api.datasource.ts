import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { LineNotificationResponseDto } from '../dtos/line-notification-response.dto';

@Injectable({ providedIn: 'root' })
export class LineNotificationApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: LineNotificationResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: LineNotificationResponseDto[]; total: number }>(API_ENDPOINTS.settings.lineNotifications.list, { params: httpParams });
  }

  getById(id: string): Observable<LineNotificationResponseDto> {
    return this.http.get<LineNotificationResponseDto>(API_ENDPOINTS.settings.lineNotifications.detail(id));
  }

  create(data: Partial<LineNotificationResponseDto>): Observable<LineNotificationResponseDto> {
    return this.http.post<LineNotificationResponseDto>(API_ENDPOINTS.settings.lineNotifications.create, data);
  }

  update(id: string, data: Partial<LineNotificationResponseDto>): Observable<LineNotificationResponseDto> {
    return this.http.put<LineNotificationResponseDto>(API_ENDPOINTS.settings.lineNotifications.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.lineNotifications.delete(id));
  }
}
