import { Observable } from 'rxjs';
import { Sensor } from '../entities/sensor.entity';

export interface ISensorRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Sensor[]; total: number }>;
  getById(id: string): Observable<Sensor>;
  create(sensor: Partial<Sensor>): Observable<Sensor>;
  update(id: string, sensor: Partial<Sensor>): Observable<Sensor>;
  delete(id: string): Observable<void>;
}
