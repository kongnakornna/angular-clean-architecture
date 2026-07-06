import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentRepository } from '../repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '../../../../core/di/tokens';
import { Payment } from '../entities/payment.entity';

@Injectable({ providedIn: 'root' })
export class CreatePaymentUseCase {
  constructor(@Inject(PAYMENT_REPOSITORY) private repo: IPaymentRepository) {}

  execute(payment: Partial<Payment>): Observable<Payment> {
    return this.repo.create(payment);
  }
}
