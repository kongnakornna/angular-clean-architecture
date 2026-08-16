import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';
import { JobStatusSummary } from '../entities/dashboard-stats.entity';

@Injectable({ providedIn: 'root' })
export class GetJobStatusUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(): Observable<JobStatusSummary[]> {
    return this.repo.getJobStatus();
  }
}
