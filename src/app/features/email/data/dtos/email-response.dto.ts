export interface EmailTemplateResponseDto {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EmailLogResponseDto {
  id: string;
  to: string;
  subject: string;
  templateId?: string;
  status: 'sent' | 'failed' | 'opened';
  openedAt?: string;
  error?: string;
  sentAt: string;
}
