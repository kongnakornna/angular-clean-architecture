import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JOB_CARD_REPOSITORY } from '../../../../core/di/tokens';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class GetJobUseCase {
  constructor(@Inject(JOB_CARD_REPOSITORY) private repo: IJobCardRepository) {}

  execute(id: string): Observable<JobCard> {
    return this.repo.getById(id);
  }
}
