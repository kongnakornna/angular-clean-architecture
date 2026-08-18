export type ScheduleStatus = 'active' | 'paused' | 'failed';

export interface ScheduledJob {
  id: string;
  name: string;
  cron: string;
  workflow: string;
  status: ScheduleStatus;
  nextRun: string;
  lastRun?: string;
  description?: string;
}

export interface UpcomingRun {
  time: string;
  jobName: string;
  status: 'pending' | 'running';
}
