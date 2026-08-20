import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class DashboardApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  getStats(): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.dashboard.stats));
  }

  getRevenueChart(period: string): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.dashboard.revenue), { params: { period } });
  }

  getJobStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.dashboard.jobStatus));
  }

  getTopParts(limit?: number): Observable<any[]> {
    let params = new HttpParams();
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.dashboard.topParts), { params });
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.dashboard.reportsList));
  }

  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    let p = new HttpParams().set('type', params.type).set('startDate', params.startDate).set('endDate', params.endDate);
    return this.http.get(this.endpoint(API_ENDPOINTS.dashboard.exportReport), { params: p, responseType: 'blob' });
  }
}
