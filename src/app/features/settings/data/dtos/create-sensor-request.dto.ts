export interface CreateSensorRequestDto {
  name: string;
  type: string;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  status: boolean;
}
