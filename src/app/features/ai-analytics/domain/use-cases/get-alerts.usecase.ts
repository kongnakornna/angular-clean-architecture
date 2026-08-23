import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../core/di/tokens';
import { Alert } from '../entities/alert.entity';

@Injectable({ providedIn: 'root' })
export class GetAlertsUseCase implements Usecase<void, Observable<Alert[]>> {
  constructor(@Inject(AI_ANALYTICS_REPOSITORY) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<Alert[]> {
    return this.repo.getAlerts();
  }
}
