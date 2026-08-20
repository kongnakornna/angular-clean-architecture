import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class DocumentApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  list(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.folderId) p = p.set('folderId', params.folderId);
      if (params.search) p = p.set('search', params.search);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.documents.list), { params: p });
  }

  getById(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.documents.detail(id))); }

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.documents.upload), formData);
  }

  delete(id: string): Observable<void> { return this.http.delete<void>(this.endpoint(API_ENDPOINTS.documents.delete(id))); }

  share(id: string, userIds: string[]): Observable<void> {
    return this.http.post<void>(this.endpoint(API_ENDPOINTS.documents.share(id)), { userIds });
  }

  listFolders(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.documents.list + '/folders')); }
}
