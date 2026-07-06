import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { GPSData } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetDeviceHistoryUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(id: string, startDate: Date, endDate: Date): Observable<GPSData[]> {
    return this.repo.getDeviceHistory(id, startDate, endDate);
  }
}
