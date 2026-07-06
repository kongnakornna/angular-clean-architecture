import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class EmailApiDataSource {
  constructor(private http: HttpClient) {}

  send(data: { to: string; subject: string; body: string }): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.email.send, data);
  }

  sendBulk(data: { recipients: string[]; subject: string; body: string }): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.email.sendBulk, data);
  }

  getLogs(params?: any): Observable<{ data: any[]; total: number }> {
    return this.http.get<{ data: any[]; total: number }>(API_ENDPOINTS.email.logs, { params });
  }

  getTemplates(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.email.templates); }

  createTemplate(data: any): Observable<any> { return this.http.post(API_ENDPOINTS.email.createTemplate, data); }
}
