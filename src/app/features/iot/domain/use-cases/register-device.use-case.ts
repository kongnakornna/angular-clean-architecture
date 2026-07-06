import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { Device } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class RegisterDeviceUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(device: Partial<Device>): Observable<Device> {
    return this.repo.registerDevice(device);
  }
}
