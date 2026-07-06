import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IQuotationRepository } from '../../domain/repositories/quotation.repository';
import { Quotation } from '../../domain/entities/quotation.entity';
import { QuotationApiDataSource } from '../datasources/quotation.api.datasource';

@Injectable({ providedIn: 'root' })
export class QuotationRepositoryImpl implements IQuotationRepository {
  constructor(private ds: QuotationApiDataSource) {}

  list(params?: any): Observable<{ data: Quotation[]; total: number }> {
    return this.ds.list(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toEntity(d)), total: r.total })));
  }
  getById(id: string): Observable<Quotation> { return this.ds.getById(id).pipe(map((d) => this.toEntity(d))); }
  create(q: Partial<Quotation>): Observable<Quotation> { return this.ds.create(q).pipe(map((d) => this.toEntity(d))); }
  update(id: string, q: Partial<Quotation>): Observable<Quotation> { return this.ds.update(id, q).pipe(map((d) => this.toEntity(d))); }
  approve(id: string): Observable<Quotation> { return this.ds.approve(id).pipe(map((d) => this.toEntity(d))); }
  reject(id: string, reason?: string): Observable<Quotation> { return this.ds.reject(id, reason).pipe(map((d) => this.toEntity(d))); }

  private toEntity(d: any): Quotation {
    return {
      id: d.id, quotationNumber: d.quotationNumber, customerId: d.customerId, customerName: d.customerName,
      subject: d.subject, items: d.items || [], subtotal: d.subtotal, discount: d.discount, vat: d.vat,
      total: d.total, status: d.status, validUntil: new Date(d.validUntil), notes: d.notes,
      createdBy: d.createdBy, approvedBy: d.approvedBy,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
