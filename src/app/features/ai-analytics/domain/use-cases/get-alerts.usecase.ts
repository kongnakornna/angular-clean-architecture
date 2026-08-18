import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { Alert } from '../entities/alert.entity';

@Injectable({ providedIn: 'root' })
export class GetAlertsUseCase implements Usecase<void, Observable<Alert[]>> {
  constructor(@Inject(IAIAnalyticsRepository) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<Alert[]> {
    return this.repo.getAlerts();
  }
}
