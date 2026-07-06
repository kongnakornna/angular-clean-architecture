import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';
import { RevenueData } from '../entities/dashboard-stats.entity';

@Injectable({ providedIn: 'root' })
export class GetRevenueChartUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(period: string): Observable<RevenueData[]> {
    return this.repo.getRevenueChart(period);
  }
}
