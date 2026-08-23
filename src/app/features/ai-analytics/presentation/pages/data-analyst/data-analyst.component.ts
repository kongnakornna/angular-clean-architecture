import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import { ChartWidgetComponent } from '../../components/chart-widget/chart-widget.component';
import { AiInsightPanelComponent } from '../../components/ai-insight-panel/ai-insight-panel.component';
import { AnalystKPI, DataInsight, ChartData } from '../../../domain/entities/data-analyst.entity';
import { GetInsightsUseCase } from '../../../domain/use-cases/get-insights.usecase';

interface InsightsState {
  kpi: AnalystKPI;
  insights: DataInsight[];
  chart: ChartData;
}

@Component({
  selector: 'app-data-analyst',
  standalone: true,
  imports: [CommonModule, TranslatePipe, KpiCardComponent, ChartWidgetComponent, AiInsightPanelComponent],
  templateUrl: './data-analyst.component.html',
  styleUrls: ['./data-analyst.component.scss'],
})
export class DataAnalystComponent implements OnInit, OnDestroy {
  private insightsSubject = new BehaviorSubject<InsightsState | null>(null);
  insights$ = this.insightsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private getInsights: GetInsightsUseCase) {}

  ngOnInit(): void {
    this.loadInsights();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInsights(): void {
    this.loadingSubject.next(true);

    this.getInsights.execute('monthly')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.insightsSubject.next(data);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.insightsSubject.next(null);
          this.loadingSubject.next(false);
        },
      });
  }
}
