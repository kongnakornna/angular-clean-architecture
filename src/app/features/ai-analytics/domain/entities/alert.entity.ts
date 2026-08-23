export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'muted';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  triggeredAt: string;
  source: string;
  status: AlertStatus;
}

export interface AlertRule {
  id: string;
  condition: string;
  actions: string[];
  enabled: boolean;
}
