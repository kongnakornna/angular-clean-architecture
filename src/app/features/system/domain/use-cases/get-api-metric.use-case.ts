import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemRepository } from '../repositories/system.repository';
import { SYSTEM_REPOSITORY } from '../../../../core/di/tokens';
import { ApiMetric } from '../entities/system.entity';

@Injectable({ providedIn: 'root' })
export class GetApiMetricUseCase {
  constructor(@Inject(SYSTEM_REPOSITORY) private repo: ISystemRepository) {}

  execute(): Observable<ApiMetric> {
    return this.repo.getApiMetric();
  }
}
