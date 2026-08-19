import { Observable } from 'rxjs';
import { Host } from '../entities/host.entity';

export interface IHostRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Host[]; total: number }>;
  getById(id: string): Observable<Host>;
  create(host: Partial<Host>): Observable<Host>;
  update(id: string, host: Partial<Host>): Observable<Host>;
  delete(id: string): Observable<void>;
}
