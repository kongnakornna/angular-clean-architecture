import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuotationRepository } from '../repositories/quotation.repository';
import { QUOTATION_REPOSITORY } from '../../../../core/di/tokens';
import { Quotation } from '../entities/quotation.entity';

@Injectable({ providedIn: 'root' })
export class CreateQuotationUseCase {
  constructor(@Inject(QUOTATION_REPOSITORY) private repo: IQuotationRepository) {}

  execute(quotation: Partial<Quotation>): Observable<Quotation> {
    return this.repo.create(quotation);
  }
}
