import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class JobCardApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: { status?: string; priority?: string; search?: string; page?: number; pageSize?: number }): Observable<{ data: any[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.priority) httpParams = httpParams.set('priority', params.priority);
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.jobs.list), { params: httpParams });
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.jobs.detail(id)));
  }

  create(data: any): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.jobs.create), data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.jobs.update(id)), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.jobs.delete(id)));
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.patch(this.endpoint(API_ENDPOINTS.jobs.status(id)), { status });
  }

  assign(id: string, userId: string): Observable<any> {
    return this.http.patch(this.endpoint(API_ENDPOINTS.jobs.assign(id)), { userId });
  }

  getBoardData(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.jobs.board));
  }
}
