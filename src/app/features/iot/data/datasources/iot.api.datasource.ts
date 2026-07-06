import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class IoTApiDataSource {
  constructor(private http: HttpClient) {}

  listDevices(): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.iot.devices); }
  registerDevice(data: any): Observable<any> { return this.http.post(API_ENDPOINTS.iot.register, data); }
  getDeviceLocation(id: string): Observable<any> { return this.http.get(API_ENDPOINTS.iot.location(id)); }

  getDeviceHistory(id: string, startDate: Date, endDate: Date): Observable<any[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any[]>(API_ENDPOINTS.iot.history(id), { params });
  }

  getSensorData(id: string): Observable<any[]> { return this.http.get<any[]>(API_ENDPOINTS.iot.sensors(id)); }
}
