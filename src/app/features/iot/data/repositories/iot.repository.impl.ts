import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IIoTRepository } from '../../domain/repositories/iot.repository';
import { Device, GPSData, SensorData, TopicData, DeviceGroup, DeviceBucket, SensorChartData, DeviceStatusInfo, DeviceConfig, PaginatedIoTData, IoTDataRecord, DeviceStats } from '../../domain/entities/device.entity';
import { IoTApiDataSource } from '../datasources/iot.api.datasource';

@Injectable({ providedIn: 'root' })
export class IoTRepositoryImpl implements IIoTRepository {
  constructor(private ds: IoTApiDataSource) {}

  listDevices(): Observable<Device[]> {
    return this.ds.listDevices().pipe(map((list) => list.map((d: any) => this.toDevice(d))));
  }

  registerDevice(device: Partial<Device>): Observable<Device> {
    return this.ds.registerDevice(device).pipe(map((d) => this.toDevice(d)));
  }

  getDeviceLocation(id: string): Observable<GPSData> {
    return this.ds.getDeviceLocation(id).pipe(map((d) => this.toGPS(d)));
  }

  getDeviceHistory(id: string, startDate: Date, endDate: Date): Observable<GPSData[]> {
    return this.ds.getDeviceHistory(id, startDate, endDate).pipe(map((list) => list.map((d) => this.toGPS(d))));
  }

  getSensorData(id: string): Observable<SensorData[]> {
    return this.ds.getSensorData(id).pipe(map((list) => list.map((d: any) => ({
      id: d.id, deviceId: d.deviceId, temperature: d.temperature, humidity: d.humidity,
      pressure: d.pressure, other: d.other || {}, timestamp: new Date(d.timestamp),
    }))));
  }

  getTopicData(topic: string, delcache?: string): Observable<TopicData> {
    return this.ds.getTopicData(topic, delcache).pipe(map((d) => ({
      topic: d.topic, payload: d.payload, from: d.from, timestamp: d.timestamp,
      mqttConnected: d.mqttConnected, cacheEnabled: d.cacheEnabled, cacheHit: d.cacheHit,
      dataLength: d.dataLength, fetchDurationMs: d.fetchDurationMs,
    })));
  }

  getTopicDeviceChart(bucket: string, topic: string, measurement?: string, field?: string, start?: string, stop?: string, limit?: number, delcache?: string): Observable<any> {
    return this.ds.getTopicDeviceChart(bucket, topic, measurement, field, start, stop, limit, delcache);
  }

  getControls(topic: string, message: string): Observable<any> {
    return this.ds.getControls(topic, message);
  }

  postControl(data: { topic: string; message: string }): Observable<any> {
    return this.ds.postControl(data);
  }

  getMonitorDeviceGroup(bucket: string, locationId?: string, hardwareId?: string, lang?: string, delcache?: string): Observable<any> {
    return this.ds.getMonitorDeviceGroup(bucket, locationId, hardwareId, lang, delcache);
  }

  getMonitorDeviceChart(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any> {
    return this.ds.getMonitorDeviceChart(bucket, measurement, field, start, stop, limit);
  }

  getDeviceBuckets(bucket: string): Observable<DeviceBucket> {
    return this.ds.getDeviceBuckets(bucket);
  }

  listDevicesPaginated(params: { page?: number; pageSize?: number; bucket?: string; hardwareId?: string; typeId?: string; keyword?: string; lang?: string }): Observable<{ data: DeviceGroup[]; total: number; page: number }> {
    return this.ds.listDevicesPaginated(params).pipe(map((res: any) => ({
      data: (res.data || []).map((d: any) => this.toDeviceGroup(d)),
      total: res.total, page: res.page,
    })));
  }

  getSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<SensorChartData> {
    return this.ds.getSenserCharts(bucket, measurement, field, start, stop, limit).pipe(map((d) => this.toSensorChart(d)));
  }

  getDeviceSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<SensorChartData> {
    return this.ds.getDeviceSenserCharts(bucket, measurement, field, start, stop, limit).pipe(map((d) => this.toSensorChart(d)));
  }

  getLocationDevice(locationId: number): Observable<any> {
    return this.ds.getLocationDevice(locationId);
  }

  getAlarmDeviceStatus(params: { bucket?: string; measurement?: string; deviceId?: string; typeId?: string; hardwareId?: string; page?: number; pageSize?: number }): Observable<any> {
    return this.ds.getAlarmDeviceStatus(params);
  }

  getAlarmDeviceStatusControl(params: { bucket?: string; deviceId?: string; typeId?: string; hardwareId?: string }): Observable<any> {
    return this.ds.getAlarmDeviceStatusControl(params);
  }

  getDeviceStatus(deviceId: string): Observable<DeviceStatusInfo> {
    return this.ds.getDeviceStatus(deviceId);
  }

  updateDeviceStatus(data: { deviceId: string; [key: string]: any }): Observable<any> {
    return this.ds.updateDeviceStatus(data);
  }

  getDeviceConfig(deviceId: string): Observable<DeviceConfig> {
    return this.ds.getDeviceConfig(deviceId);
  }

  updateDeviceConfig(data: { deviceId: string; [key: string]: any }): Observable<any> {
    return this.ds.updateDeviceConfig(data);
  }

  getDeviceIoTData(deviceId: string, params: { page?: number; limit?: number; startDate?: string; endDate?: string }): Observable<PaginatedIoTData> {
    return this.ds.getDeviceIoTData(deviceId, params).pipe(map((res: any) => ({
      data: (res.data || []).map((d: any) => ({ id: d.id, deviceId: d.deviceId, data: d.data, timestamp: d.timestamp, location: d.location, metadata: d.metadata } as IoTDataRecord)),
      pagination: res.pagination,
    })));
  }

  getDeviceStats(deviceId: string): Observable<DeviceStats> {
    return this.ds.getDeviceStats(deviceId);
  }

  exportDeviceData(deviceId: string, startDate: string, endDate: string, format?: string): Observable<Blob> {
    return this.ds.exportDeviceData(deviceId, startDate, endDate, format);
  }

  cleanupDeviceData(days?: number): Observable<void> {
    return this.ds.cleanupDeviceData(days);
  }

  private toDevice(d: any): Device {
    return {
      id: d.id, name: d.name, deviceId: d.deviceId, type: d.type, status: d.status,
      lastLocation: d.lastLocation ? this.toGPS(d.lastLocation) : undefined,
      lastSeen: d.lastSeen ? new Date(d.lastSeen) : undefined,
      battery: d.battery, createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
    };
  }

  private toGPS(d: any): GPSData {
    return {
      latitude: d.latitude, longitude: d.longitude, speed: d.speed, heading: d.heading,
      accuracy: d.accuracy, timestamp: new Date(d.timestamp),
    };
  }

  private toDeviceGroup(d: any): DeviceGroup {
    return {
      deviceId: d.deviceId, deviceName: d.deviceName, typeName: d.typeName,
      valueData: d.valueData, unit: d.unit, status: d.status, alarmTitle: d.alarmTitle,
      statusWarning: d.statusWarning, statusAlert: d.statusAlert,
      recoveryWarning: d.recoveryWarning, recoveryAlert: d.recoveryAlert,
      icon: d.icon, colorNormal: d.colorNormal, colorWarning: d.colorWarning, colorAlert: d.colorAlert,
    };
  }

  private toSensorChart(d: any): SensorChartData {
    return { data: d.data || [], date: d.date || [], cache: d.cache };
  }
}
