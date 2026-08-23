export interface AlarmConfig {
  id: string;
  enabled: boolean;
  defaultThreshold: AlarmThreshold;
  notificationChannels: NotificationChannel[];
  cooldownMinutes: number;
  escalateAfterMinutes: number;
  maxAlertsPerHour: number;
}

export interface AlarmThreshold {
  warningMin: number;
  warningMax: number;
  alertMin: number;
  alertMax: number;
  unit: string;
}

export interface AlarmRule {
  id: string;
  name: string;
  deviceId: string;
  sensorType: string;
  condition: '>' | '<' | '>=' | '<=' | '==' | '!=';
  threshold: number;
  severity: 'warning' | 'alert' | 'critical';
  enabled: boolean;
  notifyChannels: string[];
}

export type NotificationChannel = 'email' | 'line' | 'sms' | 'webhook';
