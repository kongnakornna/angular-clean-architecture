import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { APP_CONFIG } from '../../../../core/config/app.config';
import { ScheduleLogDto, AlarmLogDto, LogsControlDto, DeviceReportDto } from '../dtos/report.dto';

@Injectable({ providedIn: 'root' })
export class ReportApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  private endpoint(path: string): string {
    return `${this.cfg.apiBaseUrl}${path}`;
  }

  getScheduleLogs(): Observable<ScheduleLogDto[]> {
    return this.http.get<ScheduleLogDto[]>(this.endpoint(API_ENDPOINTS.reports.scheduleLogs));
  }

  getAlarmLogs(): Observable<AlarmLogDto[]> {
    return this.http.get<AlarmLogDto[]>(this.endpoint(API_ENDPOINTS.reports.alarmLogs));
  }

  getLogsControl(): Observable<LogsControlDto[]> {
    return this.http.get<LogsControlDto[]>(this.endpoint(API_ENDPOINTS.reports.logsControl));
  }

  getDeviceReport(): Observable<DeviceReportDto[]> {
    return this.http.get<DeviceReportDto[]>(this.endpoint(API_ENDPOINTS.reports.deviceReport));
  }
}
