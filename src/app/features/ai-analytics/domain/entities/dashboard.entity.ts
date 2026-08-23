export interface KPI {
  label: string;
  value: string | number;
  delta: number;
  deltaDirection: 'up' | 'down' | 'neutral';
}

export interface SystemHealthItem {
  name: string;
  online?: number;
  total?: number;
  used?: number;
  unit?: string;
  value?: number;
}

export interface DashboardAlert {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export interface DashboardState {
  kpis: KPI[];
  systemHealth: SystemHealthItem[];
  alerts: DashboardAlert[];
}
