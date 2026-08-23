export interface EmailConfig {
  id: string;
  provider: 'smtp' | 'sendgrid' | 'ses' | 'mailgun';
  host: string;
  port: number;
  username: string;
  password: string;
  fromAddress: string;
  fromName: string;
  encryption: 'none' | 'ssl' | 'tls';
  enabled: boolean;
}
