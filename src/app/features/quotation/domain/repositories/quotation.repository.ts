import { Observable } from 'rxjs';
import { Quotation } from '../entities/quotation.entity';

export interface IQuotationRepository {
  list(params?: { status?: string; customerId?: string; page?: number; pageSize?: number }): Observable<{ data: Quotation[]; total: number }>;
  getById(id: string): Observable<Quotation>;
  create(quotation: Partial<Quotation>): Observable<Quotation>;
  update(id: string, quotation: Partial<Quotation>): Observable<Quotation>;
  approve(id: string): Observable<Quotation>;
  reject(id: string, reason?: string): Observable<Quotation>;
}
