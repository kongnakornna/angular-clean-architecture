import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { DeviceStats } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceStatsUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(deviceId: string): Observable<DeviceStats> {
    return this.repo.getDeviceStats(deviceId);
  }
}
