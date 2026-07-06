import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerRepository } from '../repositories/customer.repository';
import { CUSTOMER_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteCustomerUseCase {
  constructor(@Inject(CUSTOMER_REPOSITORY) private repo: ICustomerRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
