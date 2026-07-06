import { Observable } from 'rxjs';
import { EmailTemplate, EmailLog } from '../entities/email-template.entity';

export interface IEmailRepository {
  send(to: string, subject: string, body: string): Observable<void>;
  sendBulk(recipients: string[], subject: string, body: string): Observable<void>;
  getLogs(params?: { page?: number; pageSize?: number }): Observable<{ data: EmailLog[]; total: number }>;
  getTemplates(): Observable<EmailTemplate[]>;
  createTemplate(template: Partial<EmailTemplate>): Observable<EmailTemplate>;
}
