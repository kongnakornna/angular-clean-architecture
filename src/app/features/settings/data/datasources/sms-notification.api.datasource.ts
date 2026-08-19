import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { SmsNotificationResponseDto } from '../dtos/sms-notification-response.dto';

@Injectable({ providedIn: 'root' })
export class SmsNotificationApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: SmsNotificationResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: SmsNotificationResponseDto[]; total: number }>(API_ENDPOINTS.settings.smsNotifications.list, { params: httpParams });
  }

  getById(id: string): Observable<SmsNotificationResponseDto> {
    return this.http.get<SmsNotificationResponseDto>(API_ENDPOINTS.settings.smsNotifications.detail(id));
  }

  create(data: Partial<SmsNotificationResponseDto>): Observable<SmsNotificationResponseDto> {
    return this.http.post<SmsNotificationResponseDto>(API_ENDPOINTS.settings.smsNotifications.create, data);
  }

  update(id: string, data: Partial<SmsNotificationResponseDto>): Observable<SmsNotificationResponseDto> {
    return this.http.put<SmsNotificationResponseDto>(API_ENDPOINTS.settings.smsNotifications.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.smsNotifications.delete(id));
  }
}
