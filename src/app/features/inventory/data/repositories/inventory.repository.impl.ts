import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IInventoryRepository } from '../../domain/repositories/inventory.repository';
import { Product, StockMovement, Category } from '../../domain/entities/product.entity';
import { InventoryApiDataSource } from '../datasources/inventory.api.datasource';

@Injectable({ providedIn: 'root' })
export class InventoryRepositoryImpl implements IInventoryRepository {
  constructor(private ds: InventoryApiDataSource) {}

  listProducts(params?: any): Observable<{ data: Product[]; total: number }> {
    return this.ds.listProducts(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toProduct(d)), total: r.total })));
  }
  getProduct(id: string): Observable<Product> { return this.ds.getProduct(id).pipe(map((d) => this.toProduct(d))); }
  createProduct(p: Partial<Product>): Observable<Product> { return this.ds.createProduct(p).pipe(map((d) => this.toProduct(d))); }
  updateProduct(id: string, p: Partial<Product>): Observable<Product> { return this.ds.updateProduct(id, p).pipe(map((d) => this.toProduct(d))); }
  deleteProduct(id: string): Observable<void> { return this.ds.deleteProduct(id); }
  adjustStock(id: string, quantity: number, note: string): Observable<StockMovement> {
    return this.ds.adjustStock(id, quantity, note).pipe(map((d) => this.toMovement(d)));
  }
  getStockMovements(id: string): Observable<StockMovement[]> {
    return this.ds.getStockMovements(id).pipe(map((list) => list.map((d) => this.toMovement(d))));
  }
  getLowStockProducts(): Observable<Product[]> {
    return this.ds.getLowStockProducts().pipe(map((list) => list.map((d) => this.toProduct(d))));
  }
  listCategories(): Observable<Category[]> {
    return this.ds.listCategories().pipe(map((list) => list.map((d) => ({ id: d.id, name: d.name, description: d.description }))));
  }

  private toProduct(d: any): Product {
    return {
      id: d.id, code: d.code, name: d.name, description: d.description,
      categoryId: d.categoryId, categoryName: d.categoryName, unit: d.unit,
      price: d.price, cost: d.cost, currentStock: d.currentStock, minimumStock: d.minimumStock,
      barcode: d.barcode, isActive: d.isActive, createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }

  private toMovement(d: any): StockMovement {
    return {
      id: d.id, productId: d.productId, productName: d.productName, type: d.type,
      quantity: d.quantity, beforeStock: d.beforeStock, afterStock: d.afterStock,
      reference: d.reference, note: d.note, createdBy: d.createdBy, createdAt: new Date(d.createdAt),
    };
  }
}
