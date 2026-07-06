import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class CreateJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  execute(job: Partial<JobCard>): Observable<JobCard> {
    return this.repo.create(job);
  }
}
