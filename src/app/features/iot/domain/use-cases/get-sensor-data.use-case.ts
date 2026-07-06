import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { SensorData } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetSensorDataUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(id: string): Observable<SensorData[]> {
    return this.repo.getSensorData(id);
  }
}
