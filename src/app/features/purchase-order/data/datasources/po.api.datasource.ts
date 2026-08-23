import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class POApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.status) p = p.set('status', params.status);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.purchaseOrders.list), { params: p });
  }

  getById(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.purchaseOrders.detail(id))); }
  create(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.purchaseOrders.create), data); }
  update(id: string, data: any): Observable<any> { return this.http.put(this.endpoint(API_ENDPOINTS.purchaseOrders.update(id)), data); }
  approve(id: string): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.purchaseOrders.approve(id)), {}); }
}
