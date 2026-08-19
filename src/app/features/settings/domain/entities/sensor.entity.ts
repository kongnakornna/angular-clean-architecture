export interface Sensor {
  id: string;
  name: string;
  type: string;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
