import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IWebOrderRepository } from '../../domain/repositories/web-order.repository';
import { WebOrder } from '../../domain/entities/web-order.entity';
import { WOSApiDataSource } from '../datasources/wos.api.datasource';

@Injectable({ providedIn: 'root' })
export class WebOrderRepositoryImpl implements IWebOrderRepository {
  constructor(private ds: WOSApiDataSource) {}

  list(params?: any): Observable<{ data: WebOrder[]; total: number }> {
    return this.ds.list(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toEntity(d)), total: r.total })));
  }
  getById(id: string): Observable<WebOrder> { return this.ds.getById(id).pipe(map((d) => this.toEntity(d))); }
  create(order: Partial<WebOrder>): Observable<WebOrder> { return this.ds.create(order).pipe(map((d) => this.toEntity(d))); }
  updateStatus(id: string, status: string): Observable<WebOrder> { return this.ds.updateStatus(id, status).pipe(map((d) => this.toEntity(d))); }
  cancel(id: string): Observable<WebOrder> { return this.ds.cancel(id).pipe(map((d) => this.toEntity(d))); }

  private toEntity(d: any): WebOrder {
    return {
      id: d.id, orderNumber: d.orderNumber, customerId: d.customerId, customerName: d.customerName,
      customerEmail: d.customerEmail, items: d.items || [], subtotal: d.subtotal,
      shippingCost: d.shippingCost, vat: d.vat, total: d.total, status: d.status,
      shippingAddress: d.shippingAddress, trackingNumber: d.trackingNumber, notes: d.notes,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
