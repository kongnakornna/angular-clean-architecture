import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class UpdateJobStatusUseCase {
  constructor(private repo: IJobCardRepository) {}

  execute(id: string, status: string): Observable<JobCard> {
    return this.repo.updateStatus(id, status);
  }
}
