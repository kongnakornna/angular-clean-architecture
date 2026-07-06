import { Observable } from 'rxjs';
import { Product, StockMovement, Category } from '../entities/product.entity';

export interface IInventoryRepository {
  listProducts(params?: { search?: string; categoryId?: string; page?: number; pageSize?: number }): Observable<{ data: Product[]; total: number }>;
  getProduct(id: string): Observable<Product>;
  createProduct(product: Partial<Product>): Observable<Product>;
  updateProduct(id: string, product: Partial<Product>): Observable<Product>;
  deleteProduct(id: string): Observable<void>;
  adjustStock(id: string, quantity: number, note: string): Observable<StockMovement>;
  getStockMovements(id: string): Observable<StockMovement[]>;
  getLowStockProducts(): Observable<Product[]>;
  listCategories(): Observable<Category[]>;
}
