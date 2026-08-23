import { Observable } from 'rxjs';
import { AlarmValidationRequest, AlarmValidationResponse } from '../entities/alarm.entity';

export interface IAlarmRepository {
  validate(request: AlarmValidationRequest): Observable<AlarmValidationResponse>;
  validateEn(request: AlarmValidationRequest): Observable<AlarmValidationResponse>;
  validateTh(request: AlarmValidationRequest): Observable<AlarmValidationResponse>;
}
