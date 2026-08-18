import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { ToolResult } from '../../domain/entities/chat-message.entity';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ActionExecutorService {
  private baseUrl = environment.apiTargetUrl || '/api';

  constructor(private http: HttpClient) {}

  execute(action: string, params: Record<string, any>): Observable<ToolResult> {
    const handler = this.actionMap[action];
    if (!handler) {
      return of({ toolCallId: '', content: `Unknown action: ${action}`, success: false });
    }

    return handler(params).pipe(
      map(response => ({
        toolCallId: '',
        content: JSON.stringify(response),
        success: true
      })),
      catchError(err => of({
        toolCallId: '',
        content: `Action failed: ${err.message || err.statusText}`,
        success: false
      }))
    );
  }

  private actionMap: Record<string, (params: any) => Observable<any>> = {
    create_job: (p) => this.http.post(`${this.baseUrl}/jobs`, {
      title: p.title,
      customer_id: p.customerId,
      description: p.description,
      priority: p.priority || 'medium'
    }),

    send_email: (p) => this.http.post(`${this.baseUrl}/email/send`, {
      to: p.to,
      subject: p.subject,
      body: p.body
    }),

    generate_report: (p) => this.http.post(`${this.baseUrl}/reports/generate`, {
      type: p.type,
      date_from: p.dateFrom,
      date_to: p.dateTo
    }),

    create_quotation: (p) => this.http.post(`${this.baseUrl}/quotations`, {
      customer_id: p.customerId,
      items: p.items,
      notes: p.notes
    }),

    create_purchase_order: (p) => this.http.post(`${this.baseUrl}/purchase-orders`, {
      supplier_id: p.supplierId,
      items: p.items,
      notes: p.notes
    }),

    search_records: (p) => this.http.get(`${this.baseUrl}/${p.type}`, {
      params: { q: p.query, limit: (p.limit || 10).toString() }
    }),

    get_dashboard_data: () => this.http.get(`${this.baseUrl}/dashboard/summary`)
  };
}
