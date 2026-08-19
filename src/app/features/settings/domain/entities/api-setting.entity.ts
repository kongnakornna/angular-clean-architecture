export interface ApiSetting {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
