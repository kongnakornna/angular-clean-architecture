import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../core/di/tokens';
import { DashboardState } from '../entities/dashboard.entity';

@Injectable({ providedIn: 'root' })
export class GetDashboardStatsUseCase implements Usecase<void, Observable<DashboardState>> {
  constructor(@Inject(AI_ANALYTICS_REPOSITORY) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<DashboardState> {
    return this.repo.getDashboardState();
  }
}
