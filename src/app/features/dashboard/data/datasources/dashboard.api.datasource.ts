import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class DashboardApiDataSource {
  constructor(private http: HttpClient) {}

  getStats(): Observable<any> { return this.http.get(API_ENDPOINTS.dashboard.stats); }

  getRevenueChart(period: string): Observable<any[]> {
    return this.http.get<any[]>(API_ENDPOINTS.dashboard.revenue, { params: { period } });
  }

  getRecentActivities(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.dashboard.activities); }

  getReports(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.dashboard.reportsList); }

  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    let p = new HttpParams().set('type', params.type).set('startDate', params.startDate).set('endDate', params.endDate);
    return this.http.get(API_ENDPOINTS.dashboard.exportReport, { params: p, responseType: 'blob' });
  }
}
