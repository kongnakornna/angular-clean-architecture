import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttRepository } from '../repositories/mqtt.repository';
import { MQTT_REPOSITORY } from '../../../../core/di/tokens';
import { Flow } from '../entities/flow.entity';

@Injectable({ providedIn: 'root' })
export class GetFlowsUseCase {
  constructor(@Inject(MQTT_REPOSITORY) private repo: IMqttRepository) {}

  execute(): Observable<Flow[]> {
    return this.repo.getFlows();
  }
}
