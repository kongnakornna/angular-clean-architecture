import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemRepository } from '../repositories/system.repository';
import { SYSTEM_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class GetMetricsUseCase {
  constructor(@Inject(SYSTEM_REPOSITORY) private repo: ISystemRepository) {}

  execute(): Observable<string> {
    return this.repo.getMetrics();
  }
}
