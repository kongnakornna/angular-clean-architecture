import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBatchJobRepository } from '../repositories/batch-job.repository';
import { BATCH_JOB_REPOSITORY } from '../../../../core/di/tokens';
import { BatchJob } from '../entities/batch-job.entity';

@Injectable({ providedIn: 'root' })
export class GetBatchJobUseCase {
  constructor(@Inject(BATCH_JOB_REPOSITORY) private repo: IBatchJobRepository) {}

  execute(id: string): Observable<BatchJob> {
    return this.repo.getById(id);
  }
}
