import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IBatchJobRepository } from '../../domain/repositories/batch-job.repository';
import { BatchJob, BatchJobHistory } from '../../domain/entities/batch-job.entity';
import { BatchApiDataSource } from '../datasources/batch.api.datasource';

@Injectable({ providedIn: 'root' })
export class BatchJobRepositoryImpl implements IBatchJobRepository {
  constructor(private ds: BatchApiDataSource) {}

  list(): Observable<BatchJob[]> {
    return this.ds.list().pipe(map((list) => list.map((d: any) => this.toJob(d))));
  }
  getById(id: string): Observable<BatchJob> { return this.ds.getById(id).pipe(map((d) => this.toJob(d))); }
  create(job: Partial<BatchJob>): Observable<BatchJob> { return this.ds.create(job).pipe(map((d) => this.toJob(d))); }
  trigger(id: string): Observable<void> { return this.ds.trigger(id); }
  getHistory(id: string): Observable<BatchJobHistory[]> {
    return this.ds.getHistory(id).pipe(map((list) => list.map((d: any) => ({
      id: d.id, jobId: d.jobId, status: d.status,
      startedAt: new Date(d.startedAt), completedAt: d.completedAt ? new Date(d.completedAt) : undefined,
      error: d.error, result: d.result,
    }))));
  }

  private toJob(d: any): BatchJob {
    return {
      id: d.id, name: d.name, description: d.description, cronExpression: d.cronExpression,
      status: d.status, lastRun: d.lastRun ? new Date(d.lastRun) : undefined,
      nextRun: d.nextRun ? new Date(d.nextRun) : undefined,
      createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }
}
