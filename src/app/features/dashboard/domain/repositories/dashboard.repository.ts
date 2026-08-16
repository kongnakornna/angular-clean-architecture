import { Observable } from 'rxjs';
import { DashboardStats, RevenueData, JobStatusSummary, TopPartData } from '../entities/dashboard-stats.entity';
import { Report } from '../entities/report.entity';

export interface IDashboardRepository {
  getStats(): Observable<DashboardStats>;
  getRevenueChart(period: string): Observable<RevenueData[]>;
  getJobStatus(): Observable<JobStatusSummary[]>;
  getTopParts(limit?: number): Observable<TopPartData[]>;
  getReports(): Observable<Report[]>;
  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob>;
}
