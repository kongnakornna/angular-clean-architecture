import { Observable } from 'rxjs';
import { Flow, SensorDefinition, MqttBrokerConfig, FlowDeployStatus } from '../entities/flow.entity';

export interface IMqttRepository {
  getFlows(): Observable<Flow[]>;
  getFlow(id: string): Observable<Flow>;
  saveFlow(flow: Flow): Observable<Flow>;
  deleteFlow(id: string): Observable<void>;
  deployFlow(id: string): Observable<FlowDeployStatus>;
  stopFlow(id: string): Observable<FlowDeployStatus>;
  getAvailableSensors(): Observable<SensorDefinition[]>;
  getBrokerConfig(): Observable<MqttBrokerConfig>;
  updateBrokerConfig(config: MqttBrokerConfig): Observable<MqttBrokerConfig>;
  getDeployStatus(): Observable<FlowDeployStatus[]>;
}
