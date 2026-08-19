import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensorRepository } from '../repositories/sensor.repository';
import { SENSOR_REPOSITORY } from '../../../../core/di/tokens';
import { Sensor } from '../entities/sensor.entity';

@Injectable({ providedIn: 'root' })
export class ListSensorsUseCase {
  constructor(@Inject(SENSOR_REPOSITORY) private repo: ISensorRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Sensor[]; total: number }> {
    return this.repo.list(params);
  }
}
