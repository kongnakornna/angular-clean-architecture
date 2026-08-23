import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ExportDeviceDataUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(deviceId: string, startDate: string, endDate: string, format?: string): Observable<Blob> {
    return this.repo.exportDeviceData(deviceId, startDate, endDate, format);
  }
}
