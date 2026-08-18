import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttRepository } from '../repositories/mqtt.repository';
import { MQTT_REPOSITORY } from '../../../../core/di/tokens';
import { FlowDeployStatus } from '../entities/flow.entity';

@Injectable({ providedIn: 'root' })
export class DeployFlowUseCase {
  constructor(@Inject(MQTT_REPOSITORY) private repo: IMqttRepository) {}

  execute(flowId: string): Observable<FlowDeployStatus> {
    return this.repo.deployFlow(flowId);
  }
}
