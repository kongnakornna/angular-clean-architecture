import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AI_ANALYTICS_REPOSITORY } from '../../../../core/di/tokens';
import { Report } from '../entities/report.entity';

@Injectable({ providedIn: 'root' })
export class GetReportsUseCase implements Usecase<string | undefined, Observable<Report[]>> {
  constructor(@Inject(AI_ANALYTICS_REPOSITORY) private repo: IAIAnalyticsRepository) {}

  execute(folder?: string): Observable<Report[]> {
    return this.repo.getReports(folder);
  }
}
