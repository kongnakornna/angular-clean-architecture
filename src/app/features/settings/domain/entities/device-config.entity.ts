export interface DeviceConfigSettings {
  defaultRefreshInterval: number;
  defaultPageSize: number;
  enableAutoRegister: boolean;
  dataRetentionDays: number;
  enableGeolocation: boolean;
  gpsAccuracyThreshold: number;
  heartbeatInterval: number;
  offlineTimeout: number;
  defaultTimezone: string;
}

export interface DeviceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  defaultFields: DeviceField[];
  enabled: boolean;
}

export interface DeviceField {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'json';
  unit?: string;
  required: boolean;
  defaultValue?: any;
}
