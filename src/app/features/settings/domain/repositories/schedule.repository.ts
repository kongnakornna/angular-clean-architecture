import { Observable } from 'rxjs';
import { Schedule } from '../entities/schedule.entity';

export interface IScheduleRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Schedule[]; total: number }>;
  getById(id: string): Observable<Schedule>;
  create(schedule: Partial<Schedule>): Observable<Schedule>;
  update(id: string, schedule: Partial<Schedule>): Observable<Schedule>;
  delete(id: string): Observable<void>;
}
