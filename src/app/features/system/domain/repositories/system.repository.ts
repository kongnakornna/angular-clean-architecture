import { Observable } from 'rxjs';
import { PingResponse, HealthCheck, ApiMetric } from '../entities/system.entity';

export interface ISystemRepository {
  ping(): Observable<PingResponse>;
  health(): Observable<HealthCheck>;
  getMetrics(): Observable<string>;
  getApiMetric(): Observable<ApiMetric>;
}
