import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetAlarmDeviceStatusControlUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(params: { bucket?: string; deviceId?: string; typeId?: string; hardwareId?: string }): Observable<any> {
    return this.repo.getAlarmDeviceStatusControl(params);
  }
}
