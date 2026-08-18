import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../core/di/tokens';
import { Workflow } from '../entities/workflow.entity';

@Injectable({ providedIn: 'root' })
export class GetWorkflowsUseCase implements Usecase<void, Observable<Workflow[]>> {
  constructor(@Inject(AI_ANALYTICS_REPOSITORY) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<Workflow[]> {
    return this.repo.getWorkflows();
  }
}
