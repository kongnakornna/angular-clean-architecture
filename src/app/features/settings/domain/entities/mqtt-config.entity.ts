export interface MqttConfig {
  id: string;
  defaultBrokerId: string;
  reconnectPeriod: number;
  connectTimeout: number;
  keepalive: number;
  clean: boolean;
  qos: 0 | 1 | 2;
  retain: boolean;
  clientId?: string;
}

export interface MqttBroker {
  id: string;
  name: string;
  host: string;
  port: number;
  protocol: 'mqtt' | 'mqtts' | 'ws' | 'wss';
  username?: string;
  password?: string;
  clientId?: string;
  enabled: boolean;
  isDefault: boolean;
}
