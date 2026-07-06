export interface Device {
  id: string;
  name: string;
  deviceId: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastLocation?: GPSData;
  lastSeen?: Date;
  battery?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GPSData {
  latitude: number;
  longitude: number;
  speed?: number;
  heading?: number;
  accuracy?: number;
  timestamp: Date;
}

export interface SensorData {
  id: string;
  deviceId: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  other: Record<string, number>;
  timestamp: Date;
}
