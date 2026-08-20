import { Observable } from 'rxjs';
import { ScheduleLog, AlarmLog, LogsControl, DeviceReport } from '../entities/report.entity';

export interface IReportRepository {
  getScheduleLogs(): Observable<ScheduleLog[]>;
  getAlarmLogs(): Observable<AlarmLog[]>;
  getLogsControl(): Observable<LogsControl[]>;
  getDeviceReport(): Observable<DeviceReport[]>;
}
