import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MonitoringDevice } from '../../domain/entities/monitoring-device.entity';
import { IMonitoringDeviceRepository } from '../../domain/repositories/monitoring-device.repository';
import { MonitoringApiDatasource } from '../datasources/monitoring.api.datasource';
import { MonitoringDeviceResponseDto } from '../dtos/monitoring-device-response.dto';

@Injectable({ providedIn: 'root' })
export class MonitoringDeviceRepositoryImpl implements IMonitoringDeviceRepository {
  constructor(private datasource: MonitoringApiDatasource) {}

  listByModule(module: string): Observable<{ data: MonitoringDevice[]; total: number }> {
    return this.datasource.listByModule(module).pipe(
      map(response => ({
        data: response.data.map(this.toEntity),
        total: response.total,
      }))
    );
  }

  private toEntity(dto: MonitoringDeviceResponseDto): MonitoringDevice {
    return {
      id: dto.id,
      name: dto.name,
      module: dto.module,
      status: dto.status,
      location: dto.location,
    };
  }
}
