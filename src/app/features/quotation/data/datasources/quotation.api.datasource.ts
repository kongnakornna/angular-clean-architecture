import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class QuotationApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.status) p = p.set('status', params.status);
      if (params.customerId) p = p.set('customerId', params.customerId);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(API_ENDPOINTS.quotations.list, { params: p });
  }

  getById(id: string): Observable<any> { return this.http.get(API_ENDPOINTS.quotations.detail(id)); }
  create(data: any): Observable<any> { return this.http.post(API_ENDPOINTS.quotations.create, data); }
  update(id: string, data: any): Observable<any> { return this.http.put(API_ENDPOINTS.quotations.update(id), data); }
  approve(id: string): Observable<any> { return this.http.post(API_ENDPOINTS.quotations.approve(id), {}); }
  reject(id: string, reason?: string): Observable<any> { return this.http.post(API_ENDPOINTS.quotations.reject(id), { reason }); }
}
