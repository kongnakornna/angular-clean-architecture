import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class GetJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  execute(id: string): Observable<JobCard> {
    return this.repo.getById(id);
  }
}
