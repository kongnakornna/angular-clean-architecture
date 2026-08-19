import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScheduleRepository } from '../repositories/schedule.repository';
import { SCHEDULE_REPOSITORY } from '../../../../core/di/tokens';
import { Schedule } from '../entities/schedule.entity';

@Injectable({ providedIn: 'root' })
export class ListSchedulesUseCase {
  constructor(@Inject(SCHEDULE_REPOSITORY) private repo: IScheduleRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Schedule[]; total: number }> {
    return this.repo.list(params);
  }
}
