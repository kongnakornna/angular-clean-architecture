export interface CreateSmsNotificationRequestDto {
  name: string;
  gatewayUrl: string;
  apiKey: string;
  phone: string;
  status: boolean;
}
