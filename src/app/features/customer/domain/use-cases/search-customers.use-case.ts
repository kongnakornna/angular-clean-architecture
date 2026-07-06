import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerRepository } from '../repositories/customer.repository';
import { CUSTOMER_REPOSITORY } from '../../../../core/di/tokens';
import { Customer } from '../entities/customer.entity';

@Injectable({ providedIn: 'root' })
export class SearchCustomersUseCase {
  constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

  execute(query: string): Observable<Customer[]> {
    return this.repo.search(query);
  }
}
