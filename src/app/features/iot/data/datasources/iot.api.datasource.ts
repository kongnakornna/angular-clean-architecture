import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';

@Injectable({ providedIn: 'root' })
export class IoTApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  private endpoint(path: string): string {
    return `${this.fallbackService.getActiveBaseUrl()}${path}`;
  }

  listDevices(): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.iot.devices)); }
  registerDevice(data: any): Observable<any> { return this.http.post(this.endpoint(API_ENDPOINTS.iot.register), data); }
  getDeviceLocation(id: string): Observable<any> { return this.http.get(this.endpoint(API_ENDPOINTS.iot.location(id))); }

  getDeviceHistory(id: string, startDate: Date, endDate: Date): Observable<any[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.iot.history(id)), { params });
  }

  getSensorData(id: string): Observable<any[]> { return this.http.get<any[]>(this.endpoint(API_ENDPOINTS.iot.sensors(id))); }

  getTopicData(topic: string, delcache?: string): Observable<any> {
    let params = new HttpParams().set('topic', topic);
    if (delcache) params = params.set('delcache', delcache);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.topic), { params });
  }

  getTopicDeviceChart(bucket: string, topic: string, measurement?: string, field?: string, start?: string, stop?: string, limit?: number, delcache?: string): Observable<any> {
    let params = new HttpParams().set('bucket', bucket).set('topic', topic);
    if (measurement) params = params.set('measurement', measurement);
    if (field) params = params.set('field', field);
    if (start) params = params.set('start', start);
    if (stop) params = params.set('stop', stop);
    if (limit) params = params.set('limit', limit.toString());
    if (delcache) params = params.set('delcache', delcache);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.topicDeviceChart), { params });
  }

  getControls(topic: string, message: string): Observable<any> {
    const params = new HttpParams().set('topic', topic).set('message', message);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.controls), { params });
  }

  postControl(data: { topic: string; message: string }): Observable<any> {
    return this.http.post(this.endpoint(API_ENDPOINTS.iot.control), data);
  }

  getMonitorDeviceGroup(bucket: string, locationId?: string, hardwareId?: string, lang?: string, delcache?: string): Observable<any> {
    let params = new HttpParams().set('bucket', bucket);
    if (locationId) params = params.set('locationId', locationId);
    if (hardwareId) params = params.set('hardwareId', hardwareId);
    if (lang) params = params.set('lang', lang);
    if (delcache) params = params.set('delcache', delcache);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.monitorDeviceGroup), { params });
  }

  getMonitorDeviceChart(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any> {
    let params = new HttpParams().set('bucket', bucket).set('measurement', measurement);
    if (field) params = params.set('field', field);
    if (start) params = params.set('start', start);
    if (stop) params = params.set('stop', stop);
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.monitorDeviceChart), { params });
  }

  getDeviceBuckets(bucket: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceBuckets), { params: { bucket } });
  }

  listDevicesPaginated(params: { page?: number; pageSize?: number; bucket?: string; hardwareId?: string; typeId?: string; keyword?: string; lang?: string }): Observable<any> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.bucket) httpParams = httpParams.set('bucket', params.bucket);
    if (params.hardwareId) httpParams = httpParams.set('hardwareId', params.hardwareId);
    if (params.typeId) httpParams = httpParams.set('typeId', params.typeId);
    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    if (params.lang) httpParams = httpParams.set('lang', params.lang);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.devices), { params: httpParams });
  }

  getSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any> {
    let params = new HttpParams().set('bucket', bucket).set('measurement', measurement);
    if (field) params = params.set('field', field);
    if (start) params = params.set('start', start);
    if (stop) params = params.set('stop', stop);
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.senserCharts), { params });
  }

  getDeviceSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any> {
    let params = new HttpParams().set('bucket', bucket).set('measurement', measurement);
    if (field) params = params.set('field', field);
    if (start) params = params.set('start', start);
    if (stop) params = params.set('stop', stop);
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceSenserCharts), { params });
  }

  getLocationDevice(locationId: number): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.locationDevice), { params: { locationId: locationId.toString() } });
  }

  getAlarmDeviceStatus(params: { bucket?: string; measurement?: string; deviceId?: string; typeId?: string; hardwareId?: string; page?: number; pageSize?: number }): Observable<any> {
    let httpParams = new HttpParams();
    if (params.bucket) httpParams = httpParams.set('bucket', params.bucket);
    if (params.measurement) httpParams = httpParams.set('measurement', params.measurement);
    if (params.deviceId) httpParams = httpParams.set('deviceId', params.deviceId);
    if (params.typeId) httpParams = httpParams.set('typeId', params.typeId);
    if (params.hardwareId) httpParams = httpParams.set('hardwareId', params.hardwareId);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.alarmDeviceStatus), { params: httpParams });
  }

  getAlarmDeviceStatusControl(params: { bucket?: string; deviceId?: string; typeId?: string; hardwareId?: string }): Observable<any> {
    let httpParams = new HttpParams();
    if (params.bucket) httpParams = httpParams.set('bucket', params.bucket);
    if (params.deviceId) httpParams = httpParams.set('deviceId', params.deviceId);
    if (params.typeId) httpParams = httpParams.set('typeId', params.typeId);
    if (params.hardwareId) httpParams = httpParams.set('hardwareId', params.hardwareId);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.alarmDeviceStatusControl), { params: httpParams });
  }

  getDeviceStatus(deviceId: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceStatus), { params: { deviceId } });
  }

  updateDeviceStatus(data: { deviceId: string; [key: string]: any }): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.iot.updateDeviceStatus), data);
  }

  getDeviceConfig(deviceId: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceConfig), { params: { deviceId } });
  }

  updateDeviceConfig(data: { deviceId: string; [key: string]: any }): Observable<any> {
    return this.http.put(this.endpoint(API_ENDPOINTS.iot.updateDeviceConfig), data);
  }

  getDeviceIoTData(deviceId: string, params: { page?: number; limit?: number; startDate?: string; endDate?: string }): Observable<any> {
    let httpParams = new HttpParams().set('deviceId', deviceId);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params.startDate) httpParams = httpParams.set('startDate', params.startDate);
    if (params.endDate) httpParams = httpParams.set('endDate', params.endDate);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceIoTData), { params: httpParams });
  }

  getDeviceStats(deviceId: string): Observable<any> {
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceStats), { params: { deviceId } });
  }

  exportDeviceData(deviceId: string, startDate: string, endDate: string, format?: string): Observable<Blob> {
    let params = new HttpParams().set('deviceId', deviceId).set('startDate', startDate).set('endDate', endDate);
    if (format) params = params.set('format', format);
    return this.http.get(this.endpoint(API_ENDPOINTS.iot.deviceDataExport), { params, responseType: 'blob' });
  }

  cleanupDeviceData(days?: number): Observable<void> {
    let params = new HttpParams();
    if (days) params = params.set('days', days.toString());
    return this.http.delete<void>(this.endpoint(API_ENDPOINTS.iot.deviceDataCleanup), { params });
  }
}
