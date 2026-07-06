import { Observable } from 'rxjs';
import { Device, GPSData, SensorData } from '../entities/device.entity';

export interface IIoTRepository {
  listDevices(): Observable<Device[]>;
  registerDevice(device: Partial<Device>): Observable<Device>;
  getDeviceLocation(id: string): Observable<GPSData>;
  getDeviceHistory(id: string, startDate: Date, endDate: Date): Observable<GPSData[]>;
  getSensorData(id: string): Observable<SensorData[]>;
}
