import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Flow, SensorDefinition, MqttBrokerConfig, FlowDeployStatus, NODE_TEMPLATES } from '../../domain/entities/flow.entity';
import { FlowDto, SensorDefinitionDto, MqttBrokerConfigDto } from '../dtos/flow.dto';

const MOCK_SENSORS: SensorDefinitionDto[] = [
  { id: 's1', name: 'Temperature A1', type: 'temperature', unit: 'C', topic: 'factory/sensors/temp/a1', minValue: -10, maxValue: 80, dataType: 'number' },
  { id: 's2', name: 'Humidity B1', type: 'humidity', unit: '%RH', topic: 'factory/sensors/hum/b1', minValue: 0, maxValue: 100, dataType: 'number' },
  { id: 's3', name: 'Pressure C1', type: 'pressure', unit: 'hPa', topic: 'factory/sensors/press/c1', minValue: 900, maxValue: 1100, dataType: 'number' },
  { id: 's4', name: 'Vibration D1', type: 'vibration', unit: 'mm/s', topic: 'factory/sensors/vib/d1', minValue: 0, maxValue: 50, dataType: 'number' },
  { id: 's5', name: 'Flow Rate E1', type: 'flow_rate', unit: 'L/min', topic: 'factory/sensors/flow/e1', minValue: 0, maxValue: 200, dataType: 'number' },
  { id: 's6', name: 'Power Monitor F1', type: 'power', unit: 'kW', topic: 'factory/sensors/power/f1', minValue: 0, maxValue: 500, dataType: 'number' },
  { id: 's7', name: 'Level Sensor G1', type: 'level', unit: 'm', topic: 'factory/sensors/level/g1', minValue: 0, maxValue: 10, dataType: 'number' },
  { id: 's8', name: 'Gas Detector H1', type: 'gas', unit: 'ppm', topic: 'factory/sensors/gas/h1', minValue: 0, maxValue: 1000, dataType: 'number' },
];

const MOCK_BROKER: MqttBrokerConfigDto = {
  host: 'mqtt.factory.local',
  port: 1883,
  clientId: 'angular-dashboard-001',
  username: 'admin',
  password: '***',
  useTls: false,
};

const MOCK_FLOWS_DTO: FlowDto[] = [
  {
    id: 'flow-1',
    name: 'Temperature Monitoring',
    description: 'Sensor A1 -> Transform -> Filter -> MQTT Publish',
    enabled: true,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-15T14:30:00Z',
    nodes: [
      {
        id: 'n1', type: 'sensor', label: 'Temp Sensor A1', x: 80, y: 120,
        config: { sensorId: 's1', sampleInterval: 5000 },
        ports: [{ id: 'out', label: 'value', dataType: 'number', direction: 'output' }],
      },
      {
        id: 'n2', type: 'transform', label: 'Round 1 decimal', x: 340, y: 120,
        config: { expression: 'Math.round(value * 10) / 10' },
        ports: [
          { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
          { id: 'out', label: 'out', dataType: 'number', direction: 'output' },
        ],
      },
      {
        id: 'n3', type: 'filter', label: 'Range Check', x: 600, y: 80,
        config: { minThreshold: 0, maxThreshold: 60 },
        ports: [
          { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
          { id: 'out', label: 'out', dataType: 'number', direction: 'output' },
          { id: 'rejected', label: 'rejected', dataType: 'number', direction: 'output' },
        ],
      },
      {
        id: 'n4', type: 'mqtt-output', label: 'Publish temp', x: 860, y: 80,
        config: { topic: 'factory/dashboard/temperature', qos: 1 },
        ports: [{ id: 'in', label: 'in', dataType: 'number', direction: 'input' }],
      },
    ],
    connections: [
      { id: 'c1', sourceNodeId: 'n1', sourcePortId: 'out', targetNodeId: 'n2', targetPortId: 'in' },
      { id: 'c2', sourceNodeId: 'n2', sourcePortId: 'out', targetNodeId: 'n3', targetPortId: 'in' },
      { id: 'c3', sourceNodeId: 'n3', sourcePortId: 'out', targetNodeId: 'n4', targetPortId: 'in' },
    ],
  },
  {
    id: 'flow-2',
    name: 'Humidity Alert',
    description: 'Sensor B1 -> Filter (high) -> MQTT Alert Topic',
    enabled: false,
    createdAt: '2026-08-05T09:00:00Z',
    updatedAt: '2026-08-10T11:00:00Z',
    nodes: [
      {
        id: 'n1', type: 'sensor', label: 'Humidity B1', x: 80, y: 100,
        config: { sensorId: 's2', sampleInterval: 10000 },
        ports: [{ id: 'out', label: 'value', dataType: 'number', direction: 'output' }],
      },
      {
        id: 'n2', type: 'filter', label: 'Humidity > 80%', x: 380, y: 100,
        config: { minThreshold: 80, maxThreshold: 100 },
        ports: [
          { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
          { id: 'out', label: 'out', dataType: 'number', direction: 'output' },
          { id: 'rejected', label: 'rejected', dataType: 'number', direction: 'output' },
        ],
      },
      {
        id: 'n3', type: 'mqtt-output', label: 'Alert Topic', x: 680, y: 100,
        config: { topic: 'factory/alerts/humidity', qos: 2 },
        ports: [{ id: 'in', label: 'in', dataType: 'number', direction: 'input' }],
      },
    ],
    connections: [
      { id: 'c1', sourceNodeId: 'n1', sourcePortId: 'out', targetNodeId: 'n2', targetPortId: 'in' },
      { id: 'c2', sourceNodeId: 'n2', sourcePortId: 'out', targetNodeId: 'n3', targetPortId: 'in' },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class MqttMockDataSource {
  private flows: FlowDto[] = JSON.parse(JSON.stringify(MOCK_FLOWS_DTO));

  getFlows(): Observable<FlowDto[]> {
    return of(this.flows).pipe(delay(300));
  }

  getFlow(id: string): Observable<FlowDto | undefined> {
    return of(this.flows.find(f => f.id === id)).pipe(delay(200));
  }

  saveFlow(flow: FlowDto): Observable<FlowDto> {
    const idx = this.flows.findIndex(f => f.id === flow.id);
    if (idx >= 0) {
      this.flows[idx] = { ...flow, updatedAt: new Date().toISOString() };
    } else {
      this.flows.push(flow);
    }
    return of(flow).pipe(delay(400));
  }

  deleteFlow(id: string): Observable<void> {
    this.flows = this.flows.filter(f => f.id !== id);
    return of(undefined).pipe(delay(300));
  }

  deployFlow(id: string): Observable<{ flowId: string; status: string; message: string; deployedAt: string }> {
    return of({
      flowId: id,
      status: 'deployed',
      message: 'Flow deployed successfully (simulated)',
      deployedAt: new Date().toISOString(),
    }).pipe(delay(800));
  }

  stopFlow(id: string): Observable<{ flowId: string; status: string; message: string }> {
    return of({
      flowId: id,
      status: 'stopped',
      message: 'Flow stopped (simulated)',
    }).pipe(delay(500));
  }

  getAvailableSensors(): Observable<SensorDefinitionDto[]> {
    return of(MOCK_SENSORS).pipe(delay(200));
  }

  getBrokerConfig(): Observable<MqttBrokerConfigDto> {
    return of(MOCK_BROKER).pipe(delay(200));
  }

  updateBrokerConfig(config: MqttBrokerConfigDto): Observable<MqttBrokerConfigDto> {
    return of(config).pipe(delay(400));
  }

  getDeployStatus(): Observable<{ flowId: string; status: string }[]> {
    const statuses = this.flows.map(f => ({
      flowId: f.id,
      status: f.enabled ? 'deployed' : 'stopped',
    }));
    return of(statuses).pipe(delay(200));
  }
}
