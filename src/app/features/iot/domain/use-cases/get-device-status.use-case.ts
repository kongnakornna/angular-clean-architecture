import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { DeviceStatusInfo } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceStatusUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(deviceId: string): Observable<DeviceStatusInfo> {
    return this.repo.getDeviceStatus(deviceId);
  }
}
