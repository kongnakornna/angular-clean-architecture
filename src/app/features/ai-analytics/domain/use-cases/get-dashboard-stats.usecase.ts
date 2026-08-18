import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { DashboardState } from '../entities/dashboard.entity';

@Injectable({ providedIn: 'root' })
export class GetDashboardStatsUseCase implements Usecase<void, Observable<DashboardState>> {
  constructor(@Inject(IAIAnalyticsRepository) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<DashboardState> {
    return this.repo.getDashboardState();
  }
}
