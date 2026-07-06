import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class BatchApiDataSource {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.batch.jobs); }
  getById(id: string): Observable<any> { return this.http.get(API_ENDPOINTS.batch.jobs + `/${id}`); }
  create(data: any): Observable<any> { return this.http.post(API_ENDPOINTS.batch.create, data); }
  trigger(id: string): Observable<void> { return this.http.post<void>(API_ENDPOINTS.batch.trigger(id), {}); }
  getHistory(id: string): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.batch.history(id)); }
}
