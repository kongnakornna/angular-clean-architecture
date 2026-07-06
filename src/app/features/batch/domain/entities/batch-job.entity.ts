export interface BatchJob {
  id: string;
  name: string;
  description: string;
  cronExpression: string;
  status: 'active' | 'inactive' | 'running';
  lastRun?: Date;
  nextRun?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BatchJobHistory {
  id: string;
  jobId: string;
  status: 'success' | 'failed' | 'running';
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  result?: string;
}
