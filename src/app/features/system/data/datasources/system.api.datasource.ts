import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/config/app.config';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { PingResponseDto, HealthCheckDto, ApiMetricDto } from '../dtos/system.dto';

@Injectable({ providedIn: 'root' })
export class SystemApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  ping(): Observable<PingResponseDto> {
    return this.http.get<PingResponseDto>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.system.ping}`);
  }

  health(): Observable<HealthCheckDto> {
    return this.http.get<HealthCheckDto>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.system.health}`);
  }

  getMetrics(): Observable<string> {
    return this.http.get(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.system.metrics}`, { responseType: 'text' });
  }

  getApiMetric(): Observable<ApiMetricDto> {
    return this.http.get<ApiMetricDto>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.system.apiMetric}`);
  }
}
