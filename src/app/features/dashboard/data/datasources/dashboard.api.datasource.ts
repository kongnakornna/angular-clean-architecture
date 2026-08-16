import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/config/app.config';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class DashboardApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  getStats(): Observable<any> {
    return this.http.get(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.stats}`);
  }

  getRevenueChart(period: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.revenue}`, { params: { period } });
  }

  getJobStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.jobStatus}`);
  }

  getTopParts(limit?: number): Observable<any[]> {
    let params = new HttpParams();
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get<any[]>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.topParts}`, { params });
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.reportsList}`);
  }

  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    let p = new HttpParams().set('type', params.type).set('startDate', params.startDate).set('endDate', params.endDate);
    return this.http.get(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.dashboard.exportReport}`, { params: p, responseType: 'blob' });
  }
}
