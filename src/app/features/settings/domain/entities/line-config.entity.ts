export interface LineConfig {
  id: string;
  accessToken: string;
  enabled: boolean;
  defaultTarget?: string;
  notifyOnAlarm: boolean;
  notifyOnRecovery: boolean;
  messageTemplate?: string;
}
