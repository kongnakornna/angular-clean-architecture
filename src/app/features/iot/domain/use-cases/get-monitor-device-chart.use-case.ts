import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetMonitorDeviceChartUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any> {
    return this.repo.getMonitorDeviceChart(bucket, measurement, field, start, stop, limit);
  }
}
