import { Observable } from 'rxjs';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export interface IPurchaseOrderRepository {
  list(params?: { status?: string; page?: number; pageSize?: number }): Observable<{ data: PurchaseOrder[]; total: number }>;
  getById(id: string): Observable<PurchaseOrder>;
  create(po: Partial<PurchaseOrder>): Observable<PurchaseOrder>;
  update(id: string, po: Partial<PurchaseOrder>): Observable<PurchaseOrder>;
  approve(id: string): Observable<PurchaseOrder>;
}
