import { Observable } from 'rxjs';
import { Payment, Invoice } from '../entities/payment.entity';

export interface IPaymentRepository {
  list(params?: { status?: string; customerId?: string; page?: number; pageSize?: number }): Observable<{ data: Payment[]; total: number }>;
  getById(id: string): Observable<Payment>;
  create(payment: Partial<Payment>): Observable<Payment>;
  verify(id: string): Observable<Payment>;
  generateInvoice(id: string): Observable<Invoice>;
}
