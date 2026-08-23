import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class EmailApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  send(data: { to: string; subject: string; body: string }): Observable<void> {
    return this.http.post<void>(this.endpoint(API_ENDPOINTS.email.send), data);
  }

  sendBulk(data: { recipients: string[]; subject: string; body: string }): Observable<void> {
    return this.http.post<void>(this.endpoint(API_ENDPOINTS.email.sendBulk), data);
  }

  getLogs(params?: any): Observable<{ data: any[]; total: number }> {
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.email.logs), { params });
  }

  getTemplates(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.email.templates)); }

  createTemplate(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.email.createTemplate), data); }
}
