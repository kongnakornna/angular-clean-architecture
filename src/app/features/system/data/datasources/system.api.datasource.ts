import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { PingResponseDto, HealthCheckDto, ApiMetricDto } from '../dtos/system.dto';

@Injectable({ providedIn: 'root' })
export class SystemApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  ping(): Observable<PingResponseDto> {
    return this.http.get<PingResponseDto>(this.endpoint(API_ENDPOINTS.system.ping));
  }

  health(): Observable<HealthCheckDto> {
    return this.http.get<HealthCheckDto>(this.endpoint(API_ENDPOINTS.system.health));
  }

  getMetrics(): Observable<string> {
    return this.http.get(this.endpoint(API_ENDPOINTS.system.metrics), { responseType: 'text' });
  }

  getApiMetric(): Observable<ApiMetricDto> {
    return this.http.get<ApiMetricDto>(this.endpoint(API_ENDPOINTS.system.apiMetric));
  }
}
