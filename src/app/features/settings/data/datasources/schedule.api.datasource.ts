import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ScheduleResponseDto } from '../dtos/schedule-response.dto';

@Injectable({ providedIn: 'root' })
export class ScheduleApiDataSource {
  constructor(private http: HttpClient) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: ScheduleResponseDto[]; total: number }> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    return this.http.get<{ data: ScheduleResponseDto[]; total: number }>(API_ENDPOINTS.settings.schedules.list, { params: httpParams });
  }

  getById(id: string): Observable<ScheduleResponseDto> {
    return this.http.get<ScheduleResponseDto>(API_ENDPOINTS.settings.schedules.detail(id));
  }

  create(data: Partial<ScheduleResponseDto>): Observable<ScheduleResponseDto> {
    return this.http.post<ScheduleResponseDto>(API_ENDPOINTS.settings.schedules.create, data);
  }

  update(id: string, data: Partial<ScheduleResponseDto>): Observable<ScheduleResponseDto> {
    return this.http.put<ScheduleResponseDto>(API_ENDPOINTS.settings.schedules.update(id), data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.settings.schedules.delete(id));
  }

  getDevicePage(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get(API_ENDPOINTS.settings.schedules.devicePage, { params: httpParams });
  }

  getDeviceList(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get(API_ENDPOINTS.settings.schedules.deviceList, { params: httpParams });
  }

  createScheduleDevice(scheduleId: string, deviceId: string): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.settings.schedules.deviceCreate}?schedule_id=${scheduleId}&device_id=${deviceId}`);
  }

  deleteScheduleDevice(scheduleId: string, deviceId: string): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.settings.schedules.deviceDelete}?schedule_id=${scheduleId}&device_id=${deviceId}`);
  }

  getLogsPaginate(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get(API_ENDPOINTS.settings.schedules.logsPaginate, { params: httpParams });
  }

  getAllSchedules(): Observable<any> {
    return this.http.get(API_ENDPOINTS.settings.schedules.allSchedules);
  }

  updateDayStatus(scheduleId: string, field: string, value: number): Observable<any> {
    return this.http.post(API_ENDPOINTS.settings.schedules.updateDayStatus, {
      schedule_id: scheduleId,
      [field]: value,
    });
  }
}
