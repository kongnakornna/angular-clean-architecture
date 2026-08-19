export interface SmsNotificationResponseDto {
  id: string;
  name: string;
  gatewayUrl: string;
  apiKey: string;
  phone: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
