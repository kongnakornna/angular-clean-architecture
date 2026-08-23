import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class CustomerApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: any[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.customers.list), { params: httpParams });
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.customers.detail(id)));
  }

  create(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.customers.create), data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.customers.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.customers.delete(id)));
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.customers.search), { params: { q: query } });
  }
}
