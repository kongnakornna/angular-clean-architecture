import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlarmRepository } from '../repositories/alarm.repository';
import { AlarmValidationRequest, AlarmValidationResponse } from '../entities/alarm.entity';
import { ALARM_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class ValidateAlarmUseCase {
  constructor(@Inject(ALARM_REPOSITORY) private repo: IAlarmRepository) {}

  execute(request: AlarmValidationRequest): Observable<AlarmValidationResponse> {
    return this.repo.validate(request);
  }
}
