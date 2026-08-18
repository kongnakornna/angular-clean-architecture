import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IMqttRepository } from '../../domain/repositories/mqtt.repository';
import { Flow, SensorDefinition, MqttBrokerConfig, FlowDeployStatus, FlowNode, FlowConnection, NodeType } from '../../domain/entities/flow.entity';
import { MqttMockDataSource } from '../datasources/mqtt-mock.datasource';
import { FlowDto, FlowNodeDto, FlowConnectionDto, SensorDefinitionDto, MqttBrokerConfigDto } from '../dtos/flow.dto';

@Injectable({ providedIn: 'root' })
export class MqttRepositoryImpl implements IMqttRepository {
  constructor(private ds: MqttMockDataSource) {}

  getFlows(): Observable<Flow[]> {
    return this.ds.getFlows().pipe(map(list => list.map(this.toFlow)));
  }

  getFlow(id: string): Observable<Flow> {
    return this.ds.getFlow(id).pipe(map(dto => {
      if (!dto) throw new Error(`Flow ${id} not found`);
      return this.toFlow(dto);
    }));
  }

  saveFlow(flow: Flow): Observable<Flow> {
    return this.ds.saveFlow(this.toFlowDto(flow)).pipe(map(this.toFlow));
  }

  deleteFlow(id: string): Observable<void> {
    return this.ds.deleteFlow(id);
  }

  deployFlow(id: string): Observable<FlowDeployStatus> {
    return this.ds.deployFlow(id).pipe(map(d => ({
      flowId: d.flowId,
      status: d.status as FlowDeployStatus['status'],
      message: d.message,
      deployedAt: new Date(d.deployedAt),
    })));
  }

  stopFlow(id: string): Observable<FlowDeployStatus> {
    return this.ds.stopFlow(id).pipe(map(d => ({
      flowId: d.flowId,
      status: d.status as FlowDeployStatus['status'],
      message: d.message,
    })));
  }

  getAvailableSensors(): Observable<SensorDefinition[]> {
    return this.ds.getAvailableSensors().pipe(map(list => list.map(this.toSensor)));
  }

  getBrokerConfig(): Observable<MqttBrokerConfig> {
    return this.ds.getBrokerConfig().pipe(map(this.toBrokerConfig));
  }

  updateBrokerConfig(config: MqttBrokerConfig): Observable<MqttBrokerConfig> {
    return this.ds.updateBrokerConfig({
      host: config.host,
      port: config.port,
      clientId: config.clientId,
      username: config.username,
      password: config.password,
      useTls: config.useTls,
    }).pipe(map(this.toBrokerConfig));
  }

  getDeployStatus(): Observable<FlowDeployStatus[]> {
    return this.ds.getDeployStatus().pipe(map(list => list.map(d => ({
      flowId: d.flowId,
      status: d.status as FlowDeployStatus['status'],
    }))));
  }

  private toFlow = (dto: FlowDto): Flow => ({
    id: dto.id,
    name: dto.name,
    description: dto.description,
    nodes: dto.nodes.map(this.toNode),
    connections: dto.connections.map(this.toConnection),
    enabled: dto.enabled,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  });

  private toNode = (dto: FlowNodeDto): FlowNode => ({
    id: dto.id,
    type: dto.type as NodeType,
    label: dto.label,
    x: dto.x,
    y: dto.y,
    config: dto.config,
    ports: dto.ports.map(p => ({
      id: p.id,
      label: p.label,
      dataType: p.dataType as any,
      direction: p.direction as any,
    })),
  });

  private toConnection = (dto: FlowConnectionDto): FlowConnection => ({
    id: dto.id,
    sourceNodeId: dto.sourceNodeId,
    sourcePortId: dto.sourcePortId,
    targetNodeId: dto.targetNodeId,
    targetPortId: dto.targetPortId,
  });

  private toSensor = (dto: SensorDefinitionDto): SensorDefinition => ({
    id: dto.id,
    name: dto.name,
    type: dto.type,
    unit: dto.unit,
    topic: dto.topic,
    minValue: dto.minValue,
    maxValue: dto.maxValue,
    dataType: dto.dataType as any,
  });

  private toBrokerConfig = (dto: MqttBrokerConfigDto): MqttBrokerConfig => ({
    host: dto.host,
    port: dto.port,
    clientId: dto.clientId,
    username: dto.username,
    password: dto.password,
    useTls: dto.useTls,
  });

  private toFlowDto = (flow: Flow): FlowDto => ({
    id: flow.id,
    name: flow.name,
    description: flow.description,
    nodes: flow.nodes.map(n => ({
      id: n.id,
      type: n.type,
      label: n.label,
      x: n.x,
      y: n.y,
      config: n.config,
      ports: n.ports.map(p => ({
        id: p.id,
        label: p.label,
        dataType: p.dataType,
        direction: p.direction,
      })),
    })),
    connections: flow.connections.map(c => ({
      id: c.id,
      sourceNodeId: c.sourceNodeId,
      sourcePortId: c.sourcePortId,
      targetNodeId: c.targetNodeId,
      targetPortId: c.targetPortId,
    })),
    enabled: flow.enabled,
    createdAt: flow.createdAt.toISOString(),
    updatedAt: flow.updatedAt.toISOString(),
  });
}
