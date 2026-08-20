import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoringDeviceResponseDto } from '../dtos/monitoring-device-response.dto';

@Injectable({ providedIn: 'root' })
export class MonitoringApiDatasource {
  constructor(private http: HttpClient) {}

  listByModule(module: string): Observable<{ data: MonitoringDeviceResponseDto[]; total: number }> {
    return this.http.get<{ data: MonitoringDeviceResponseDto[]; total: number }>(
      `/monitoring/${module}/devices`
    );
  }
}
