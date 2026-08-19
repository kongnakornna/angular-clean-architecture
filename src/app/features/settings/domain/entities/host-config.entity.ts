export interface HostConfig {
  id: string;
  hostname: string;
  port: number;
  baseUrl: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  maxUploadSize: number;
  sessionTimeout: number;
}
