import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportRepository } from '../repositories/report.repository';
import { DeviceReport } from '../entities/report.entity';
import { REPORT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetDeviceReportUseCase {
  constructor(@Inject(REPORT_REPOSITORY) private repo: IReportRepository) {}

  execute(): Observable<DeviceReport[]> {
    return this.repo.getDeviceReport();
  }
}
