export interface PingResponseDto {
  status: string;
  timestamp: string;
}

export interface HealthCheckDto {
  status: string;
  checks: Record<string, boolean>;
}

export interface ApiMetricDto {
  active_requests: number;
  total_requests: number;
  uptime_seconds: number;
}
