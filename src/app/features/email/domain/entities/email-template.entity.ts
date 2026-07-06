export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  templateId?: string;
  status: 'sent' | 'failed' | 'opened';
  openedAt?: Date;
  error?: string;
  sentAt: Date;
}
