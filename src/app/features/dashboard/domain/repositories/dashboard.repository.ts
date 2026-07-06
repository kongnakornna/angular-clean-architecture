import { Observable } from 'rxjs';
import { DashboardStats, RevenueData, Activity } from '../entities/dashboard-stats.entity';

export interface IDashboardRepository {
  getStats(): Observable<DashboardStats>;
  getRevenueChart(period: string): Observable<RevenueData[]>;
  getRecentActivities(): Observable<Activity[]>;
  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob>;
}
