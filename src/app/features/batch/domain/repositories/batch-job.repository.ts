import { Observable } from 'rxjs';
import { BatchJob, BatchJobHistory } from '../entities/batch-job.entity';

export interface IBatchJobRepository {
  list(): Observable<BatchJob[]>;
  getById(id: string): Observable<BatchJob>;
  create(job: Partial<BatchJob>): Observable<BatchJob>;
  trigger(id: string): Observable<void>;
  getHistory(id: string): Observable<BatchJobHistory[]>;
}
