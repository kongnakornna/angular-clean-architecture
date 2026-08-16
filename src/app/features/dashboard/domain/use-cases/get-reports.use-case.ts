import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardRepository } from '../repositories/dashboard.repository';
import { DASHBOARD_REPOSITORY } from '../../../../core/di/tokens';
import { Report } from '../entities/report.entity';

@Injectable({ providedIn: 'root' })
export class GetReportsUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private repo: IDashboardRepository) {}

  execute(): Observable<Report[]> {
    return this.repo.getReports();
  }
}
