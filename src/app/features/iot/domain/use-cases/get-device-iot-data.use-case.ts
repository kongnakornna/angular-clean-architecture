import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { PaginatedIoTData } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceIoTDataUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(deviceId: string, params: { page?: number; limit?: number; startDate?: string; endDate?: string }): Observable<PaginatedIoTData> {
    return this.repo.getDeviceIoTData(deviceId, params);
  }
}
