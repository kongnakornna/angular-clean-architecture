import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

@Injectable({ providedIn: 'root' })
export class CreateCustomerUseCase {
  constructor(private repo: ICustomerRepository) {}

  execute(customer: Partial<Customer>): Observable<Customer> {
    return this.repo.create(customer);
  }
}
