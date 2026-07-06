import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IIoTRepository } from '../../domain/repositories/iot.repository';
import { Device, GPSData, SensorData } from '../../domain/entities/device.entity';
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
}
