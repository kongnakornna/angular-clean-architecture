import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';
import { TopPartData } from '../entities/dashboard-stats.entity';

@Injectable({ providedIn: 'root' })
export class GetTopPartsUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(limit?: number): Observable<TopPartData[]> {
    return this.repo.getTopParts(limit);
  }
}
