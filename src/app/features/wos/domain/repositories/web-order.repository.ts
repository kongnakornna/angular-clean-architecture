import { Observable } from 'rxjs';
import { WebOrder } from '../entities/web-order.entity';

export interface IWebOrderRepository {
  list(params?: { status?: string; customerId?: string; page?: number; pageSize?: number }): Observable<{ data: WebOrder[]; total: number }>;
  getById(id: string): Observable<WebOrder>;
  create(order: Partial<WebOrder>): Observable<WebOrder>;
  updateStatus(id: string, status: string): Observable<WebOrder>;
  cancel(id: string): Observable<WebOrder>;
}
