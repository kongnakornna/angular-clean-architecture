import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

@Injectable({ providedIn: 'root' })
export class ListCustomersUseCase {
  constructor(private repo: ICustomerRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Customer[]; total: number }> {
    return this.repo.list(params);
  }
}
