import { Observable } from 'rxjs';
import { Device, GPSData, SensorData, TopicData, DeviceGroup, DeviceBucket, SensorChartData, DeviceStatusInfo, DeviceConfig, PaginatedIoTData, DeviceStats } from '../entities/device.entity';

export interface IIoTRepository {
  listDevices(): Observable<Device[]>;
  registerDevice(device: Partial<Device>): Observable<Device>;
  getDeviceLocation(id: string): Observable<GPSData>;
  getDeviceHistory(id: string, startDate: Date, endDate: Date): Observable<GPSData[]>;
  getSensorData(id: string): Observable<SensorData[]>;

  getTopicData(topic: string, delcache?: string): Observable<TopicData>;
  getTopicDeviceChart(bucket: string, topic: string, measurement?: string, field?: string, start?: string, stop?: string, limit?: number, delcache?: string): Observable<any>;
  getControls(topic: string, message: string): Observable<any>;
  postControl(data: { topic: string; message: string }): Observable<any>;
  getMonitorDeviceGroup(bucket: string, locationId?: string, hardwareId?: string, lang?: string, delcache?: string): Observable<any>;
  getMonitorDeviceChart(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<any>;
  getDeviceBuckets(bucket: string): Observable<DeviceBucket>;
  listDevicesPaginated(params: { page?: number; pageSize?: number; bucket?: string; hardwareId?: string; typeId?: string; keyword?: string; lang?: string }): Observable<{ data: DeviceGroup[]; total: number; page: number }>;
  getSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<SensorChartData>;
  getDeviceSenserCharts(bucket: string, measurement: string, field?: string, start?: string, stop?: string, limit?: number): Observable<SensorChartData>;
  getLocationDevice(locationId: number): Observable<any>;
  getAlarmDeviceStatus(params: { bucket?: string; measurement?: string; deviceId?: string; typeId?: string; hardwareId?: string; page?: number; pageSize?: number }): Observable<any>;
  getAlarmDeviceStatusControl(params: { bucket?: string; deviceId?: string; typeId?: string; hardwareId?: string }): Observable<any>;
  getDeviceStatus(deviceId: string): Observable<DeviceStatusInfo>;
  updateDeviceStatus(data: { deviceId: string; [key: string]: any }): Observable<any>;
  getDeviceConfig(deviceId: string): Observable<DeviceConfig>;
  updateDeviceConfig(data: { deviceId: string; [key: string]: any }): Observable<any>;
  getDeviceIoTData(deviceId: string, params: { page?: number; limit?: number; startDate?: string; endDate?: string }): Observable<PaginatedIoTData>;
  getDeviceStats(deviceId: string): Observable<DeviceStats>;
  exportDeviceData(deviceId: string, startDate: string, endDate: string, format?: string): Observable<Blob>;
  cleanupDeviceData(days?: number): Observable<void>;
}
