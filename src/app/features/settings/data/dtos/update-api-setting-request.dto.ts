export interface UpdateApiSettingRequestDto {
  name: string;
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  status: boolean;
}
