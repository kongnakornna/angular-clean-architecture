export interface InfluxConfig {
  id: string;
  url: string;
  token: string;
  org: string;
  defaultBucket: string;
  retentionDays: number;
  enabled: boolean;
}
