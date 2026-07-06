import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailTemplate, EmailLog } from '../../domain/entities/email-template.entity';
import { EmailApiDataSource } from '../datasources/email.api.datasource';

@Injectable({ providedIn: 'root' })
export class EmailRepositoryImpl implements IEmailRepository {
  constructor(private ds: EmailApiDataSource) {}

  send(to: string, subject: string, body: string): Observable<void> { return this.ds.send({ to, subject, body }); }
  sendBulk(recipients: string[], subject: string, body: string): Observable<void> { return this.ds.sendBulk({ recipients, subject, body }); }

  getLogs(params?: any): Observable<{ data: EmailLog[]; total: number }> {
    return this.ds.getLogs(params).pipe(map((r) => ({
      data: r.data.map((d: any) => ({
        id: d.id, to: d.to, subject: d.subject, templateId: d.templateId,
        status: d.status, openedAt: d.openedAt ? new Date(d.openedAt) : undefined,
        error: d.error, sentAt: new Date(d.sentAt),
      })), total: r.total,
    })));
  }

  getTemplates(): Observable<EmailTemplate[]> {
    return this.ds.getTemplates().pipe(map((list) => list.map((d: any) => ({
      id: d.id, name: d.name, subject: d.subject, body: d.body,
      variables: d.variables || [], createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    }))));
  }

  createTemplate(template: Partial<EmailTemplate>): Observable<EmailTemplate> {
    return this.ds.createTemplate(template).pipe(map((d: any) => ({
      id: d.id, name: d.name, subject: d.subject, body: d.body,
      variables: d.variables || [], createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    })));
  }
}
