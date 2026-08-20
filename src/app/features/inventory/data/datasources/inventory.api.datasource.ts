import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class InventoryApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  listProducts(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.search) p = p.set('search', params.search);
      if (params.categoryId) p = p.set('categoryId', params.categoryId);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(this.endpoint(API_ENDPOINTS.products.list), { params: p });
  }

  getProduct(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.products.detail(id))); }
  createProduct(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.products.create), data); }
  updateProduct(id: string, data: any): Observable<any> { return this.http.put(this.endpoint(API_ENDPOINTS.products.update(id)), data); }
  deleteProduct(id: string): Observable<void> { return this.http.delete<void>(this.endpoint(API_ENDPOINTS.products.delete(id))); }
  adjustStock(id: string, quantity: number, note: string): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.products.adjustStock(id)), { quantity, note });
  }
  getStockMovements(id: string): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.products.movements(id))); }
  getLowStockProducts(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.products.lowStock)); }
  listCategories(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.products.list + '/categories')); }
}
