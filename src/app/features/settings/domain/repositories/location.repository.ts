import { Observable } from 'rxjs';
import { Location } from '../entities/location.entity';

export interface ILocationRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Location[]; total: number }>;
  getById(id: string): Observable<Location>;
  create(location: Partial<Location>): Observable<Location>;
  update(id: string, location: Partial<Location>): Observable<Location>;
  delete(id: string): Observable<void>;
}
