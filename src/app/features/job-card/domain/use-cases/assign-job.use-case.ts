import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class AssignJobUseCase {
  constructor(private repo: IJobCardRepository) {}

  execute(id: string, userId: string): Observable<JobCard> {
    return this.repo.assign(id, userId);
  }
}
