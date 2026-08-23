import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

declare const Chart: any;

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent implements AfterViewInit, OnDestroy {
  @Input() type: 'line' | 'bar' | 'pie' = 'line';
  @Input() labels: string[] = [];
  @Input() datasets: { label: string; data: number[] }[] = [];

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance: any;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private renderChart(): void {
    if (!this.chartCanvas) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    const colors = [
      'rgba(32, 107, 196, 0.8)',
      'rgba(40, 167, 69, 0.8)',
      'rgba(255, 193, 7, 0.8)',
      'rgba(220, 53, 69, 0.8)',
      'rgba(111, 66, 193, 0.8)',
    ];

    const borderColors = [
      'rgba(32, 107, 196, 1)',
      'rgba(40, 167, 69, 1)',
      'rgba(255, 193, 7, 1)',
      'rgba(220, 53, 69, 1)',
      'rgba(111, 66, 193, 1)',
    ];

    const chartDatasets = this.datasets.map((ds, i) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: this.type === 'pie' ? colors.slice(0, this.labels.length) : colors[i % colors.length],
      borderColor: this.type === 'pie' ? borderColors.slice(0, this.labels.length) : borderColors[i % borderColors.length],
      borderWidth: 2,
      tension: 0.4,
      fill: this.type === 'line',
    }));

    this.chartInstance = new Chart(ctx, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: chartDatasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.datasets.length > 1,
          },
        },
      },
    });
  }
}
