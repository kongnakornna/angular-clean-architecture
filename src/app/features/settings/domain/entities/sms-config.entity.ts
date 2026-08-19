export interface SmsConfig {
  id: string;
  provider: 'twilio' | 'aws-sns' | 'nexmo' | 'custom';
  apiKey: string;
  apiSecret: string;
  fromNumber: string;
  enabled: boolean;
  maxPerHour: number;
}
