import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { APP_CONFIG } from '../../../../core/config/app.config';
import { AlarmValidationRequestDto, AlarmValidationResponseDto } from '../dtos/alarm.dto';

@Injectable({ providedIn: 'root' })
export class AlarmApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  private endpoint(path: string): string {
    return `${this.cfg.apiBaseUrl}${path}`;
  }

  validate(request: AlarmValidationRequestDto): Observable<AlarmValidationResponseDto> {
    return this.http.post<AlarmValidationResponseDto>(this.endpoint(API_ENDPOINTS.alarm.validate), request);
  }

  validateEn(request: AlarmValidationRequestDto): Observable<AlarmValidationResponseDto> {
    return this.http.post<AlarmValidationResponseDto>(this.endpoint(API_ENDPOINTS.alarm.validateEn), request);
  }

  validateTh(request: AlarmValidationRequestDto): Observable<AlarmValidationResponseDto> {
    return this.http.post<AlarmValidationResponseDto>(this.endpoint(API_ENDPOINTS.alarm.validateTh), request);
  }
}
