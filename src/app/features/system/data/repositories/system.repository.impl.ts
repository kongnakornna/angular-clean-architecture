import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ISystemRepository } from '../../domain/repositories/system.repository';
import { PingResponse, HealthCheck, ApiMetric } from '../../domain/entities/system.entity';
import { SystemApiDataSource } from '../datasources/system.api.datasource';
import { ApiMetricDto } from '../dtos/system.dto';

@Injectable({ providedIn: 'root' })
export class SystemRepositoryImpl implements ISystemRepository {
  constructor(private ds: SystemApiDataSource) {}

  ping(): Observable<PingResponse> {
    return this.ds.ping().pipe(map((r) => ({ status: r.status, timestamp: r.timestamp })));
  }

  health(): Observable<HealthCheck> {
    return this.ds.health().pipe(map((r) => ({ status: r.status, checks: r.checks })));
  }

  getMetrics(): Observable<string> {
    return this.ds.getMetrics();
  }

  getApiMetric(): Observable<ApiMetric> {
    return this.ds.getApiMetric().pipe(map((dto: ApiMetricDto) => ({
      activeRequests: dto.active_requests,
      totalRequests: dto.total_requests,
      uptimeSeconds: dto.uptime_seconds,
    })));
  }
}
