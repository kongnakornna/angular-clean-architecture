import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class PaymentApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.status) p = p.set('status', params.status);
      if (params.customerId) p = p.set('customerId', params.customerId);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.payments.list), { params: p });
  }

  getById(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.payments.detail(id))); }
  create(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.payments.create), data); }
  verify(id: string): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.payments.verify(id)), {}); }
  generateInvoice(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.payments.invoice(id))); }
}
