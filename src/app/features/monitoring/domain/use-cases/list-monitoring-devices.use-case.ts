import { Observable } from 'rxjs';
import { MonitoringDevice } from '../entities/monitoring-device.entity';
import { IMonitoringDeviceRepository } from '../repositories/monitoring-device.repository';

export class ListMonitoringDevicesUseCase {
  constructor(private repo: IMonitoringDeviceRepository) {}

  execute(module: string): Observable<{ data: MonitoringDevice[]; total: number }> {
    return this.repo.listByModule(module);
  }
}
