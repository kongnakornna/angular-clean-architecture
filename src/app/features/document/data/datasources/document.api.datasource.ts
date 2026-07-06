import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class DocumentApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.folderId) p = p.set('folderId', params.folderId);
      if (params.search) p = p.set('search', params.search);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(API_ENDPOINTS.documents.list, { params: p });
  }

  getById(id: string): Observable<any> { return this.http.get(API_ENDPOINTS.documents.detail(id)); }

  upload(formData: FormData): Observable<any> {
    return this.http.post(API_ENDPOINTS.documents.upload, formData);
  }

  delete(id: string): Observable<void> { return this.http.delete<void>(API_ENDPOINTS.documents.delete(id)); }

  share(id: string, userIds: string[]): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.documents.share(id), { userIds });
  }

  listFolders(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.documents.list + '/folders'); }
}
