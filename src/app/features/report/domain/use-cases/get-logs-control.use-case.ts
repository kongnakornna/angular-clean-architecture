import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportRepository } from '../repositories/report.repository';
import { LogsControl } from '../entities/report.entity';
import { REPORT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetLogsControlUseCase {
  constructor(@Inject(REPORT_REPOSITORY) private repo: IReportRepository) {}

  execute(): Observable<LogsControl[]> {
    return this.repo.getLogsControl();
  }
}
