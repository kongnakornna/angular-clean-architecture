export interface ScheduleLog {
  id: number;
  scheduleName: string;
  deviceName: string;
  action: string;
  status: string;
  message: string;
  timestamp: string;
}

export interface AlarmLog {
  id: number;
  alarmName: string;
  deviceName: string;
  severity: string;
  status: string;
  message: string;
  triggeredAt: string;
  resolvedAt: string;
}

export interface LogsControl {
  id: number;
  deviceName: string;
  controlName: string;
  action: string;
  value: string;
  status: string;
  timestamp: string;
}

export interface DeviceReport {
  id: number;
  deviceName: string;
  hardwareId: number;
  status: string;
  location: string;
  lastSeen: string;
  sensorCount: number;
  alarmCount: number;
}
