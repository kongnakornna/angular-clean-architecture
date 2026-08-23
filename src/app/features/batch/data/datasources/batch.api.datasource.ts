import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class BatchApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.batch.jobs)); }
  getById(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.batch.jobs + `/${id}`)); }
  create(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.batch.create), data); }
  trigger(id: string): Observable<void> { return this.http.post<void>(this.endpoint(API_ENDPOINTS.batch.trigger(id)), {}); }
  getHistory(id: string): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.batch.history(id))); }
}
