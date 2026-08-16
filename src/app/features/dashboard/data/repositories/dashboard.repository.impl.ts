import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IDashboardRepository } from '../../domain/repositories/dashboard.repository';
import { DashboardStats, RevenueData, JobStatusSummary, TopPartData } from '../../domain/entities/dashboard-stats.entity';
import { Report } from '../../domain/entities/report.entity';
import { DashboardApiDataSource } from '../datasources/dashboard.api.datasource';

@Injectable({ providedIn: 'root' })
export class DashboardRepositoryImpl implements IDashboardRepository {
  constructor(private ds: DashboardApiDataSource) {}

  getStats(): Observable<DashboardStats> {
    return this.ds.getStats().pipe(map((d) => ({
      totalDevices: d.totalDevices,
      onlineDevices: d.onlineDevices,
      activeAlerts: d.activeAlerts,
      todayCommands: d.todayCommands,
    })));
  }

  getRevenueChart(period: string): Observable<RevenueData[]> {
    return this.ds.getRevenueChart(period).pipe(map((list) =>
      list.map((d: any) => ({ period: d.period, amount: d.amount }))
    ));
  }

  getJobStatus(): Observable<JobStatusSummary[]> {
    return this.ds.getJobStatus().pipe(map((list) =>
      list.map((d: any) => ({ status: d.status, count: d.count }))
    ));
  }

  getTopParts(limit?: number): Observable<TopPartData[]> {
    return this.ds.getTopParts(limit).pipe(map((list) =>
      list.map((d: any) => ({ partName: d.partName, count: d.count }))
    ));
  }

  getReports(): Observable<Report[]> {
    return this.ds.getReports().pipe(map((list) =>
      list.map((d: any) => ({
        id: d.id, name: d.name, type: d.type, createdAt: d.createdAt,
        status: this.normalizeStatus(d.status), reportType: d.reportType,
      }))
    ));
  }

  private normalizeStatus(status: string): string {
    if (status === 'พร้อม') return 'ready';
    if (status === 'กำลังสร้าง') return 'generating';
    return status;
  }

  generateReport(params: { type: string; startDate: string; endDate: string }): Observable<Blob> {
    return this.ds.generateReport(params);
  }
}
