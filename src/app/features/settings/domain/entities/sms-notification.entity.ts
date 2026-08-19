export interface SmsNotification {
  id: string;
  name: string;
  gatewayUrl: string;
  apiKey: string;
  phone: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
