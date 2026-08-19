import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiSettingRepository } from '../repositories/api-setting.repository';
import { API_SETTING_REPOSITORY } from '../../../../core/di/tokens';
import { ApiSetting } from '../entities/api-setting.entity';

@Injectable({ providedIn: 'root' })
export class ListApiSettingsUseCase {
  constructor(@Inject(API_SETTING_REPOSITORY) private repo: IApiSettingRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ApiSetting[]; total: number }> {
    return this.repo.list(params);
  }
}
