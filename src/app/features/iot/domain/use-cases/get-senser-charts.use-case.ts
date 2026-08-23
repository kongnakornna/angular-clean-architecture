import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { SensorChartData } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetSenserChartsUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<SensorChartData> {
    return this.repo.getSenserCharts(bucket, measurement, field, start, stop, limit);
  }
}
