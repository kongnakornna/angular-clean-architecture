export interface ApiSettingResponseDto {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
