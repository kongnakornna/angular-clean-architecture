export interface CreateBatchJobRequestDto {
  name: string;
  description: string;
  cronExpression: string;
  status: 'active' | 'inactive';
}
