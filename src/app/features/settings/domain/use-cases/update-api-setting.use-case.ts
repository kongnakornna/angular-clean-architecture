import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiSettingRepository } from '../repositories/api-setting.repository';
import { API_SETTING_REPOSITORY } from '../../../../core/di/tokens';
import { ApiSetting } from '../entities/api-setting.entity';

@Injectable({ providedIn: 'root' })
export class UpdateApiSettingUseCase {
  constructor(@Inject(API_SETTING_REPOSITORY) private repo: IApiSettingRepository) {}

  execute(id: string, apiSetting: Partial<ApiSetting>): Observable<ApiSetting> {
    return this.repo.update(id, apiSetting);
  }
}
