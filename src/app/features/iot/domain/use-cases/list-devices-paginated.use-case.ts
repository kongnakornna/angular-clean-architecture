import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { DeviceGroup } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class ListDevicesPaginatedUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(params: { page?: number; pageSize?: number; bucket?: string; hardwareId?: string; typeId?: string; keyword?: string; lang?: string }): Observable<{ data: DeviceGroup[]; total: number; page: number }> {
    return this.repo.listDevicesPaginated(params);
  }
}
