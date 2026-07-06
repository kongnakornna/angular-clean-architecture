import { Observable } from 'rxjs';
import { JobCard } from '../entities/job-card.entity';

export interface IJobCardRepository {
  list(params?: { status?: string; priority?: string; search?: string; page?: number; pageSize?: number }): Observable<{ data: JobCard[]; total: number }>;
  getById(id: string): Observable<JobCard>;
  create(job: Partial<JobCard>): Observable<JobCard>;
  update(id: string, job: Partial<JobCard>): Observable<JobCard>;
  delete(id: string): Observable<void>;
  updateStatus(id: string, status: string): Observable<JobCard>;
  assign(id: string, userId: string): Observable<JobCard>;
  getBoardData(): Observable<{ status: string; jobs: JobCard[] }[]>;
}
