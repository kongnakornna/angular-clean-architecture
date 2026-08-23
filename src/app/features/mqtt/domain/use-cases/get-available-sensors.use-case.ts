import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttRepository } from '../repositories/mqtt.repository';
import { MQTT_REPOSITORY } from '../../../../core/di/tokens';
import { SensorDefinition } from '../entities/flow.entity';

@Injectable({ providedIn: 'root' })
export class GetAvailableSensorsUseCase {
  constructor(@Inject(MQTT_REPOSITORY) private repo: IMqttRepository) {}

  execute(): Observable<SensorDefinition[]> {
    return this.repo.getAvailableSensors();
  }
}
