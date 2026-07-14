import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';
import { Activity } from '../entities/dashboard-stats.entity';

@Injectable({ providedIn: 'root' })
export class GetRecentActivitiesUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(): Observable<Activity[]> {
    return this.repo.getRecentActivities();
  }
}
