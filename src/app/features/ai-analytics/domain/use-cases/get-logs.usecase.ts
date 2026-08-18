import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../core/di/tokens';
import { LogEntry, LogFilter } from '../entities/log.entity';

@Injectable({ providedIn: 'root' })
export class GetLogsUseCase implements Usecase<LogFilter | undefined, Observable<LogEntry[]>> {
  constructor(@Inject(AI_ANALYTICS_REPOSITORY) private repo: IAIAnalyticsRepository) {}

  execute(filter?: LogFilter): Observable<LogEntry[]> {
    return this.repo.getLogs(filter);
  }
}
