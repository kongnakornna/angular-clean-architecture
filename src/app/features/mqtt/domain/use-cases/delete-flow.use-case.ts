import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttRepository } from '../repositories/mqtt.repository';
import { MQTT_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteFlowUseCase {
  constructor(@Inject(MQTT_REPOSITORY) private repo: IMqttRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.deleteFlow(id);
  }
}
