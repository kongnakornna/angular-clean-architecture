import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensorRepository } from '../repositories/sensor.repository';
import { SENSOR_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteSensorUseCase {
  constructor(@Inject(SENSOR_REPOSITORY) private repo: ISensorRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
