export interface Device {
  id: string;
  name: string;
  deviceId: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastLocation?: GPSData;
  lastSeen?: Date;
  battery?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GPSData {
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  timestamp: Date;
}

export interface SensorData {
  id: string;
  deviceId: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  other: Record<string, number>;
  timestamp: Date;
}

export interface TopicData {
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

export interface DeviceGroup {
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

export interface DeviceBucket {
  bucket: string;
  devices: any[];
}

export interface SensorChartData {
  data: number[];
  date: string[];
  cache: string;
}

export interface DeviceStatusInfo {
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

export interface DeviceConfig {
  deviceId: string;
  [key: string]: any;
}

export interface IoTDataRecord {
  id: number;
  deviceId: string;
  data: Record<string, any>;
  timestamp: string;
  location: any;
  metadata: any;
}

export interface PaginatedIoTData {
  data: IoTDataRecord[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export interface DeviceStats {
  count: number;
  firstRecord: string;
  lastRecord: string;
  dataPoints: Record<string, { min: number; max: number }>;
}

export interface AlarmDeviceStatus {
  deviceId: number;
  deviceName: string;
  typeName: string;
  alarmTitle: string;
  status: number;
  statusWarning: string;
  statusAlert: string;
  recoveryWarning: string;
  recoveryAlert: string;
}
