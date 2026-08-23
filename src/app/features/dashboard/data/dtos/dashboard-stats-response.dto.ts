export interface DashboardStatsResponseDto {
  totalDevices: number;
  onlineDevices: number;
  activeAlerts: number;
  todayCommands: number;
}

export interface RevenueDataResponseDto {
  period: string;
  amount: number;
}

export interface JobStatusSummaryResponseDto {
  status: string;
  count: number;
}

export interface TopPartDataResponseDto {
  partName: string;
  count: number;
}
