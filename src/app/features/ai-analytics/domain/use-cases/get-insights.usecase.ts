import { Inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { AnalystKPI, DataInsight, ChartData } from '../entities/data-analyst.entity';

@Injectable({ providedIn: 'root' })
export class GetInsightsUseCase implements Usecase<string, Observable<{ kpi: AnalystKPI; insights: DataInsight[]; chart: ChartData }>> {
  constructor(@Inject(IAIAnalyticsRepository) private repo: IAIAnalyticsRepository) {}

  execute(period: string): Observable<{ kpi: AnalystKPI; insights: DataInsight[]; chart: ChartData }> {
    return forkJoin({
      kpi: this.repo.getAnalystKPI(),
      insights: this.repo.getInsights(),
      chart: this.repo.getChartData(period),
    });
  }
}
