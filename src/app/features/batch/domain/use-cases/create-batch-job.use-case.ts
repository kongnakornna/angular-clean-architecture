import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBatchJobRepository } from '../repositories/batch-job.repository';
import { BATCH_JOB_REPOSITORY } from '../../../../core/di/tokens';
import { BatchJob } from '../entities/batch-job.entity';

@Injectable({ providedIn: 'root' })
export class CreateBatchJobUseCase {
  constructor(@Inject(BATCH_JOB_REPOSITORY) private repo: IBatchJobRepository) {}

  execute(job: Partial<BatchJob>): Observable<BatchJob> {
    return this.repo.create(job);
  }
}
