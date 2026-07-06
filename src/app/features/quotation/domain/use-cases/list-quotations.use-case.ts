import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuotationRepository } from '../repositories/quotation.repository';
import { QUOTATION_REPOSITORY } from '../../../../core/di/tokens';
import { Quotation } from '../entities/quotation.entity';

@Injectable({ providedIn: 'root' })
export class ListQuotationsUseCase {
  constructor(@Inject(QUOTATION_REPOSITORY) private repo: IQuotationRepository) {}

  execute(params?: { status?: string; customerId?: string; page?: number; pageSize?: number }): Observable<{ data: Quotation[]; total: number }> {
    return this.repo.list(params);
  }
}
