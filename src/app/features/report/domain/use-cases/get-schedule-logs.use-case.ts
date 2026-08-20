import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportRepository } from '../repositories/report.repository';
import { ScheduleLog } from '../entities/report.entity';
import { REPORT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetScheduleLogsUseCase {
  constructor(@Inject(REPORT_REPOSITORY) private repo: IReportRepository) {}

  execute(): Observable<ScheduleLog[]> {
    return this.repo.getScheduleLogs();
  }
}
