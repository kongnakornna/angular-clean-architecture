import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensorRepository } from '../repositories/sensor.repository';
import { SENSOR_REPOSITORY } from '../../../../core/di/tokens';
import { Sensor } from '../entities/sensor.entity';

@Injectable({ providedIn: 'root' })
export class UpdateSensorUseCase {
  constructor(@Inject(SENSOR_REPOSITORY) private repo: ISensorRepository) {}

  execute(id: string, sensor: Partial<Sensor>): Observable<Sensor> {
    return this.repo.update(id, sensor);
  }
}
