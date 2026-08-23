import { Observable } from 'rxjs';
import { MonitoringDevice } from '../entities/monitoring-device.entity';

export interface IMonitoringDeviceRepository {
  listByModule(module: string): Observable<{ data: MonitoringDevice[]; total: number }>;
}
