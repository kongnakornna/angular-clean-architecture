export interface DeviceResponseDto {
  id: string;
  name: string;
  deviceId: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastLocation?: { latitude: number; longitude: number; speed?: number; heading?: number; accuracy?: number; timestamp: string };
  lastSeen?: string;
  battery?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SensorDataResponseDto {
  id: string;
  deviceId: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  other: Record<string, number>;
  timestamp: string;
}
