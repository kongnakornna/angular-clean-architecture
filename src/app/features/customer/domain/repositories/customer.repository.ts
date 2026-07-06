import { Observable } from 'rxjs';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Customer[]; total: number }>;
  getById(id: string): Observable<Customer>;
  create(customer: Partial<Customer>): Observable<Customer>;
  update(id: string, customer: Partial<Customer>): Observable<Customer>;
  delete(id: string): Observable<void>;
  search(query: string): Observable<Customer[]>;
}
