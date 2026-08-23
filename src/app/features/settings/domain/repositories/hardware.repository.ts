import { Observable } from 'rxjs';
import { Hardware } from '../entities/hardware.entity';

export interface IHardwareRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Hardware[]; total: number }>;
  getById(id: string): Observable<Hardware>;
  create(hardware: Partial<Hardware>): Observable<Hardware>;
  update(id: string, hardware: Partial<Hardware>): Observable<Hardware>;
  delete(id: string): Observable<void>;
}
