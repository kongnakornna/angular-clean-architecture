export type NodeType = 'sensor' | 'transform' | 'mqtt-output' | 'filter' | 'junction';

export type DataType = 'number' | 'string' | 'boolean' | 'json';

export interface FlowNodePort {
  id: string;
  label: string;
  dataType: DataType;
  direction: 'input' | 'output';
}

export interface FlowNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  config: Record<string, any>;
  ports: FlowNodePort[];
}

export interface FlowConnection {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  nodes: FlowNode[];
  connections: FlowConnection[];
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SensorDefinition {
  id: string;
  name: string;
  type: string;
  unit: string;
  topic: string;
  minValue: number;
  maxValue: number;
  dataType: DataType;
}

export interface MqttBrokerConfig {
  host: string;
  port: number;
  clientId: string;
  username?: string;
  password?: string;
  useTls: boolean;
}

export interface FlowDeployStatus {
  flowId: string;
  status: 'deployed' | 'stopped' | 'error';
  message?: string;
  deployedAt?: Date;
}

export const NODE_TEMPLATES: Record<NodeType, { label: string; color: string; icon: string; defaultPorts: FlowNodePort[] }> = {
  sensor: {
    label: 'Sensor',
    color: '#22c55e',
    icon: 'thermometer',
    defaultPorts: [
      { id: 'out', label: 'value', dataType: 'number', direction: 'output' },
    ],
  },
  transform: {
    label: 'Transform',
    color: '#3b82f6',
    icon: 'transform',
    defaultPorts: [
      { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
      { id: 'out', label: 'out', dataType: 'number', direction: 'output' },
    ],
  },
  'mqtt-output': {
    label: 'MQTT Output',
    color: '#f59e0b',
    icon: 'radio',
    defaultPorts: [
      { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
    ],
  },
  filter: {
    label: 'Filter',
    color: '#ef4444',
    icon: 'filter',
    defaultPorts: [
      { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
      { id: 'out', label: 'out', dataType: 'number', direction: 'output' },
      { id: 'rejected', label: 'rejected', dataType: 'number', direction: 'output' },
    ],
  },
  junction: {
    label: 'Junction',
    color: '#8b5cf6',
    icon: 'git-branch',
    defaultPorts: [
      { id: 'in', label: 'in', dataType: 'number', direction: 'input' },
      { id: 'out1', label: 'out 1', dataType: 'number', direction: 'output' },
      { id: 'out2', label: 'out 2', dataType: 'number', direction: 'output' },
    ],
  },
};
