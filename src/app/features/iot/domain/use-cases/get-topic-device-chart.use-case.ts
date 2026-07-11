import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetTopicDeviceChartUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(bucket: string, topic: string, measurement?: string, field?: string, start?: string, stop?: string, limit?: number, delcache?: string): Observable<any> {
    return this.repo.getTopicDeviceChart(bucket, topic, measurement, field, start, stop, limit, delcache);
  }
}
