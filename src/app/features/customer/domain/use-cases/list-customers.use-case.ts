import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerRepository } from '../repositories/customer.repository';
import { CUSTOMER_REPOSITORY } from '../../../../core/di/tokens';
import { Customer } from '../entities/customer.entity';

@Injectable({ providedIn: 'root' })
export class ListCustomersUseCase {
  constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Customer[]; total: number }> {
    return this.repo.list(params);
  }
}
