export interface CreateJobRequestDto {
  customerId: string;
  deviceType: string;
  deviceModel?: string;
  serialNumber?: string;
  problemDescription: string;
  priority: string;
  assignedTo?: string;
  estimatedHours?: number;
  startDate?: string;
}
