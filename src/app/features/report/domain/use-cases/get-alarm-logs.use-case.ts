import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportRepository } from '../repositories/report.repository';
import { AlarmLog } from '../entities/report.entity';
import { REPORT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetAlarmLogsUseCase {
  constructor(@Inject(REPORT_REPOSITORY) private repo: IReportRepository) {}

  execute(): Observable<AlarmLog[]> {
    return this.repo.getAlarmLogs();
  }
}
