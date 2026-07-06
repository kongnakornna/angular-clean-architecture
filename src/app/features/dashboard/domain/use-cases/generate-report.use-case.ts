import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GenerateReportUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    return this.repo.generateReport(params);
  }
}
