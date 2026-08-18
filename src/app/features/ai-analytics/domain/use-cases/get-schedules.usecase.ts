import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { ScheduledJob } from '../entities/schedule.entity';

@Injectable({ providedIn: 'root' })
export class GetSchedulesUseCase implements Usecase<void, Observable<ScheduledJob[]>> {
  constructor(@Inject(IAIAnalyticsRepository) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<ScheduledJob[]> {
    return this.repo.getSchedules();
  }
}
