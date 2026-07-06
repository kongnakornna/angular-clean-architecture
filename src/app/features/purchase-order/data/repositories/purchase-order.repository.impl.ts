import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPurchaseOrderRepository } from '../../domain/repositories/purchase-order.repository';
import { PurchaseOrder } from '../../domain/entities/purchase-order.entity';
import { POApiDataSource } from '../datasources/po.api.datasource';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderRepositoryImpl implements IPurchaseOrderRepository {
  constructor(private ds: POApiDataSource) {}

  list(params?: any): Observable<{ data: PurchaseOrder[]; total: number }> {
    return this.ds.list(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toEntity(d)), total: r.total })));
  }
  getById(id: string): Observable<PurchaseOrder> { return this.ds.getById(id).pipe(map((d) => this.toEntity(d))); }
  create(po: Partial<PurchaseOrder>): Observable<PurchaseOrder> { return this.ds.create(po).pipe(map((d) => this.toEntity(d))); }
  update(id: string, po: Partial<PurchaseOrder>): Observable<PurchaseOrder> { return this.ds.update(id, po).pipe(map((d) => this.toEntity(d))); }
  approve(id: string): Observable<PurchaseOrder> { return this.ds.approve(id).pipe(map((d) => this.toEntity(d))); }

  private toEntity(d: any): PurchaseOrder {
    return {
      id: d.id, poNumber: d.poNumber, quotationId: d.quotationId, supplierName: d.supplierName,
      items: d.items || [], subtotal: d.subtotal, vat: d.vat, total: d.total, status: d.status,
      expectedDelivery: d.expectedDelivery ? new Date(d.expectedDelivery) : undefined,
      notes: d.notes, createdBy: d.createdBy, approvedBy: d.approvedBy,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
