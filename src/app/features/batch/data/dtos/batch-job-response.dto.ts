export interface BatchJobResponseDto {
  id: string;
  name: string;
  description: string;
  cronExpression: string;
  status: 'active' | 'inactive' | 'running';
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
  updatedAt: string;
}
