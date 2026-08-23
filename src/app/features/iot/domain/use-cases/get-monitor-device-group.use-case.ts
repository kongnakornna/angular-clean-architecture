import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetMonitorDeviceGroupUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(bucket: string, locationId?: string, hardwareId?: string, lang?: string, delcache?: string): Observable<any> {
    return this.repo.getMonitorDeviceGroup(bucket, locationId, hardwareId, lang, delcache);
  }
}
