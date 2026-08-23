import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { DeviceConfig } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceConfigUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(deviceId: string): Observable<DeviceConfig> {
    return this.repo.getDeviceConfig(deviceId);
  }
}
