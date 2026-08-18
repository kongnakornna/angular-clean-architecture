import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ContextProviderService {
  private baseUrl = environment.apiTargetUrl || '/api';

  constructor(private http: HttpClient) {}

  getContext(contextTypes: string[]): Observable<string> {
    if (contextTypes.length === 0) return of('');

    const requests = contextTypes.map(type => this.fetchContext(type));

    return forkJoin(requests).pipe(
      map(results => results.filter(r => r).join('\n\n'))
    );
  }

  private fetchContext(type: string): Observable<string> {
    const endpoints: Record<string, string> = {
      dashboard: `${this.baseUrl}/dashboard/summary`,
      jobs: `${this.baseUrl}/jobs?limit=5&sort=created_at&order=desc`,
      customers: `${this.baseUrl}/customers?limit=5&sort=name`,
      iot: `${this.baseUrl}/iot/devices?limit=5`,
      analytics: `${this.baseUrl}/analytics/summary`
    };

    const endpoint = endpoints[type];
    if (!endpoint) return of('');

    return this.http.get<any>(endpoint).pipe(
      map(data => `[${type.toUpperCase()} CONTEXT]\n${JSON.stringify(data, null, 2)}`),
      catchError(() => of(''))
    );
  }

  detectContextTypes(message: string): string[] {
    const lower = message.toLowerCase();
    const types: string[] = [];

    if (/dashboard|kpi|revenue|summary|status/i.test(lower)) types.push('dashboard');
    if (/job|order|task|work/i.test(lower)) types.push('jobs');
    if (/customer|client|company/i.test(lower)) types.push('customers');
    if (/iot|device|sensor|alert/i.test(lower)) types.push('iot');
    if (/analytics|report|chart|graph/i.test(lower)) types.push('analytics');

    return types;
  }
}
