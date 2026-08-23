export interface ScheduleLogDto {
  id: number;
  scheduleName: string;
  deviceName: string;
  action: string;
  status: string;
  message: string;
  timestamp: string;
}

export interface AlarmLogDto {
  id: number;
  alarmName: string;
  deviceName: string;
  severity: string;
  status: string;
  message: string;
  triggeredAt: string;
  resolvedAt: string;
}

export interface LogsControlDto {
  id: number;
  deviceName: string;
  controlName: string;
  action: string;
  value: string;
  status: string;
  timestamp: string;
}

export interface DeviceReportDto {
  id: number;
  deviceName: string;
  hardwareId: number;
  status: string;
  location: string;
  lastSeen: string;
  sensorCount: number;
  alarmCount: number;
}
