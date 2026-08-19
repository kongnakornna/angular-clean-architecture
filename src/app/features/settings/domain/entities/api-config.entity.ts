export interface ApiConfig {
  id: string;
  baseUrl: string;
  version: string;
  timeout: number;
  rateLimit: number;
  corsOrigins: string[];
  swaggerEnabled: boolean;
  debugMode: boolean;
  requestLogEnabled: boolean;
}
