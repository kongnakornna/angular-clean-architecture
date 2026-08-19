export interface SensorResponseDto {
  id: string;
  name: string;
  type: string;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
