export interface FlowDto {
  id: string;
  name: string;
  description: string;
  nodes: FlowNodeDto[];
  connections: FlowConnectionDto[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlowNodeDto {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  config: Record<string, any>;
  ports: FlowNodePortDto[];
}

export interface FlowNodePortDto {
  id: string;
  label: string;
  dataType: string;
  direction: string;
}

export interface FlowConnectionDto {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
}

export interface SensorDefinitionDto {
  id: string;
  name: string;
  type: string;
  unit: string;
  topic: string;
  minValue: number;
  maxValue: number;
  dataType: string;
}

export interface MqttBrokerConfigDto {
  host: string;
  port: number;
  clientId: string;
  username?: string;
  password?: string;
  useTls: boolean;
}

export interface FlowDeployStatusDto {
  flowId: string;
  status: string;
  message?: string;
  deployedAt?: string;
}
