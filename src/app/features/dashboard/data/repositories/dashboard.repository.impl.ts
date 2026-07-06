import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDashboardRepository } from '../../domain/repositories/dashboard.repository';
import { DashboardStats, RevenueData, Activity } from '../../domain/entities/dashboard-stats.entity';
import { DashboardApiDataSource } from '../datasources/dashboard.api.datasource';

@Injectable({ providedIn: 'root' })
export class DashboardRepositoryImpl implements IDashboardRepository {
  constructor(private ds: DashboardApiDataSource) {}

  getStats(): Observable<DashboardStats> {
    return this.ds.getStats().pipe(map((d) => ({
      totalJobs: d.totalJobs, activeJobs: d.activeJobs, totalCustomers: d.totalCustomers,
      totalRevenue: d.totalRevenue, monthlyRevenue: d.monthlyRevenue, conversionRate: d.conversionRate,
      pendingApprovals: d.pendingApprovals, lowStockItems: d.lowStockItems,
    })));
  }

  getRevenueChart(period: string): Observable<RevenueData[]> {
    return this.ds.getRevenueChart(period).pipe(map((list) =>
      list.map((d: any) => ({ month: d.month, revenue: d.revenue, expenses: d.expenses, profit: d.profit }))
    ));
  }

  getRecentActivities(): Observable<Activity[]> {
    return this.ds.getRecentActivities().pipe(map((list) =>
      list.map((d: any) => ({ id: d.id, user: d.user, action: d.action, target: d.target, time: new Date(d.time), type: d.type }))
    ));
  }

  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    return this.ds.generateReport(params);
  }
}
