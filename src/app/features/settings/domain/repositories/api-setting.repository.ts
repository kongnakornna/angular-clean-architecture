import { Observable } from 'rxjs';
import { ApiSetting } from '../entities/api-setting.entity';

export interface IApiSettingRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ApiSetting[]; total: number }>;
  getById(id: string): Observable<ApiSetting>;
  create(apiSetting: Partial<ApiSetting>): Observable<ApiSetting>;
  update(id: string, apiSetting: Partial<ApiSetting>): Observable<ApiSetting>;
  delete(id: string): Observable<void>;
}
