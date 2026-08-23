import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoringDeviceResponseDto } from '../dtos/monitoring-device-response.dto';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class MonitoringApiDatasource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  listByModule(module: string): Observable<{ data: MonitoringDeviceResponseDto[]; total: number }> {
    return this.http.get<{ data: MonitoringDeviceResponseDto[]; total: number }>(
      `${this.fallbackService.getActiveBaseUrl()}/monitoring/${module}/devices`
    );
  }
}
