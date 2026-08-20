import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IReportRepository } from '../../domain/repositories/report.repository';
import { ScheduleLog, AlarmLog, LogsControl, DeviceReport } from '../../domain/entities/report.entity';
import { ReportApiDataSource } from '../datasources/report.api.datasource';
import { ScheduleLogDto, AlarmLogDto, LogsControlDto, DeviceReportDto } from '../dtos/report.dto';

@Injectable({ providedIn: 'root' })
export class ReportRepositoryImpl implements IReportRepository {
  constructor(private ds: ReportApiDataSource) {}

  getScheduleLogs(): Observable<ScheduleLog[]> {
    return this.ds.getScheduleLogs().pipe(map((dtos) => dtos.map((dto) => this.toScheduleLogEntity(dto))));
  }

  getAlarmLogs(): Observable<AlarmLog[]> {
    return this.ds.getAlarmLogs().pipe(map((dtos) => dtos.map((dto) => this.toAlarmLogEntity(dto))));
  }

  getLogsControl(): Observable<LogsControl[]> {
    return this.ds.getLogsControl().pipe(map((dtos) => dtos.map((dto) => this.toLogsControlEntity(dto))));
  }

  getDeviceReport(): Observable<DeviceReport[]> {
    return this.ds.getDeviceReport().pipe(map((dtos) => dtos.map((dto) => this.toDeviceReportEntity(dto))));
  }

  private toScheduleLogEntity(dto: ScheduleLogDto): ScheduleLog {
    return dto;
  }

  private toAlarmLogEntity(dto: AlarmLogDto): AlarmLog {
    return dto;
  }

  private toLogsControlEntity(dto: LogsControlDto): LogsControl {
    return dto;
  }

  private toDeviceReportEntity(dto: DeviceReportDto): DeviceReport {
    return dto;
  }
}
