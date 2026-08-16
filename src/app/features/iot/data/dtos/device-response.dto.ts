export interface DeviceResponseDto {
  id: string;
  name: string;
  deviceId: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastLocation?: { latitude: number; longitude: number; speed?: number; heading?: number; accuracy?: number; timestamp: string };
  lastSeen?: string;
  battery?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SensorDataResponseDto {
  id: string;
  deviceId: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  other: Record<string, number>;
  timestamp: string;
}

export interface TopicDataResponseDto {
  topic: string;
  payload: string;
  from: string;
  timestamp: string;
  mqttConnected: boolean;
  cacheEnabled: boolean;
  cacheHit: boolean;
  dataLength: number;
  fetchDurationMs: number;
}

export interface DeviceGroupResponseDto {
  deviceId: number;
  deviceName: string;
  typeName: string;
  valueData: string;
  unit: string;
  status: number;
  alarmTitle: string;
  statusWarning: string;
  statusAlert: string;
  recoveryWarning: string;
  recoveryAlert: string;
  icon: string;
  colorNormal: string;
  colorWarning: string;
  colorAlert: string;
}

export interface DeviceBucketResponseDto {
  bucket: string;
  devices: any[];
}

export interface SensorChartDataResponseDto {
  data: number[];
  date: string[];
  cache: string;
}

export interface DeviceStatusInfoResponseDto {
  deviceId: string;
  isOnline: boolean;
  isActive: boolean;
  lastSeen: string;
  batteryLevel: number;
  signalStrength: number;
  firmwareVersion: string;
  location: { lat: number; lng: number };
  lastData: Record<string, any>;
  uptime: string;
}

export interface DeviceConfigResponseDto {
  deviceId: string;
  [key: string]: any;
}

export interface IoTDataRecordResponseDto {
  id: number;
  deviceId: string;
  data: Record<string, any>;
  timestamp: string;
  location: any;
  metadata: any;
}

export interface PaginatedIoTDataResponseDto {
  data: IoTDataRecordResponseDto[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface DeviceStatsResponseDto {
  count: number;
  firstRecord: string;
  lastRecord: string;
  dataPoints: Record<string, { min: number; max: number }>;
}
