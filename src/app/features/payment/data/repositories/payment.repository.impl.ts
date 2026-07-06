import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment, Invoice } from '../../domain/entities/payment.entity';
import { PaymentApiDataSource } from '../datasources/payment.api.datasource';

@Injectable({ providedIn: 'root' })
export class PaymentRepositoryImpl implements IPaymentRepository {
  constructor(private ds: PaymentApiDataSource) {}

  list(params?: any): Observable<{ data: Payment[]; total: number }> {
    return this.ds.list(params).pipe(map((r) => ({ data: r.data.map((d: any) => this.toPayment(d)), total: r.total })));
  }
  getById(id: string): Observable<Payment> { return this.ds.getById(id).pipe(map((d) => this.toPayment(d))); }
  create(p: Partial<Payment>): Observable<Payment> { return this.ds.create(p).pipe(map((d) => this.toPayment(d))); }
  verify(id: string): Observable<Payment> { return this.ds.verify(id).pipe(map((d) => this.toPayment(d))); }
  generateInvoice(id: string): Observable<Invoice> {
    return this.ds.generateInvoice(id).pipe(map((d) => ({
      id: d.id, invoiceNumber: d.invoiceNumber, paymentId: d.paymentId,
      customerId: d.customerId, customerName: d.customerName, items: d.items || [],
      subtotal: d.subtotal, vat: d.vat, total: d.total, status: d.status,
      issuedDate: new Date(d.issuedDate), dueDate: new Date(d.dueDate),
      paidDate: d.paidDate ? new Date(d.paidDate) : undefined,
    })));
  }

  private toPayment(d: any): Payment {
    return {
      id: d.id, paymentNumber: d.paymentNumber, invoiceId: d.invoiceId,
      customerId: d.customerId, customerName: d.customerName, amount: d.amount,
      paymentDate: new Date(d.paymentDate), paymentMethod: d.paymentMethod,
      status: d.status, reference: d.reference, notes: d.notes,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
