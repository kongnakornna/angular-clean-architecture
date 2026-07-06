import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class InventoryApiDataSource {
  constructor(private http: HttpClient) {}

  listProducts(params?: any): Observable<{ data: any[]; total: number }> {
    let p = new HttpParams();
    if (params) {
      if (params.search) p = p.set('search', params.search);
      if (params.categoryId) p = p.set('categoryId', params.categoryId);
      if (params.page) p = p.set('page', params.page);
      if (params.pageSize) p = p.set('pageSize', params.pageSize);
    }
    return this.http.get<{ data: any[]; total: number }>(API_ENDPOINTS.products.list, { params: p });
  }

  getProduct(id: string): Observable<any> { return this.http.get(API_ENDPOINTS.products.detail(id)); }
  createProduct(data: any): Observable<any> { return this.http.post(API_ENDPOINTS.products.create, data); }
  updateProduct(id: string, data: any): Observable<any> { return this.http.put(API_ENDPOINTS.products.update(id), data); }
  deleteProduct(id: string): Observable<void> { return this.http.delete<void>(API_ENDPOINTS.products.delete(id)); }
  adjustStock(id: string, quantity: number, note: string): Observable<any> {
    return this.http.post(API_ENDPOINTS.products.adjustStock(id), { quantity, note });
  }
  getStockMovements(id: string): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.products.movements(id)); }
  getLowStockProducts(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.products.lowStock); }
  listCategories(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.products.list + '/categories'); }
}
