import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { DeviceBucket } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceBucketsUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(bucket: string): Observable<DeviceBucket> {
    return this.repo.getDeviceBuckets(bucket);
  }
}
