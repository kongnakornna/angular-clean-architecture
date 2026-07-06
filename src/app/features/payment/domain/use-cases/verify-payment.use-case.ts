import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentRepository } from '../repositories/payment.repository';
import { PAYMENT_REPOSITORY } from '../../../../core/di/tokens';
import { Payment } from '../entities/payment.entity';

@Injectable({ providedIn: 'root' })
export class VerifyPaymentUseCase {
  constructor(@Inject(PAYMENT_REPOSITORY) private repo: IPaymentRepository) {}

  execute(id: string): Observable<Payment> {
    return this.repo.verify(id);
  }
}
