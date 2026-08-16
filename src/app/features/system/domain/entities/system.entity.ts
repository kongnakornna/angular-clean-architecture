export interface PingResponse {
  status: string;
  timestamp: string;
}

export interface HealthCheck {
  status: string;
  checks: Record<string, boolean>;
}

export interface ApiMetric {
  activeRequests: number;
  totalRequests: number;
  uptimeSeconds: number;
}
