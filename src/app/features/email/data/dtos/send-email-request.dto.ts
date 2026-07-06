export interface SendEmailRequestDto {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

export interface SendBulkEmailRequestDto {
  recipients: string[];
  subject: string;
  body: string;
  templateId?: string;
}
