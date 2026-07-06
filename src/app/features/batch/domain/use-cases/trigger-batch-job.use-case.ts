import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBatchJobRepository } from '../repositories/batch-job.repository';
import { BATCH_JOB_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class TriggerBatchJobUseCase {
  constructor(@Inject(BATCH_JOB_REPOSITORY) private repo: IBatchJobRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.trigger(id);
  }
}
