import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobCardRepository } from '../repositories/job-card.repository';
import { JobCard } from '../entities/job-card.entity';

@Injectable({ providedIn: 'root' })
export class ListJobsUseCase {
  constructor(private repo: IJobCardRepository) {}

  execute(params?: { status?: string; priority?: string; search?: string; page?: number; pageSize?: number }): Observable<{ data: JobCard[]; total: number }> {
    return this.repo.list(params);
  }
}
