export type TaskStatus = 'running' | 'completed' | 'failed' | 'queued' | 'paused';
export type TaskType = 'etl' | 'ai_analysis' | 'report' | 'email' | 'sync' | 'workflow';

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  status: TaskStatus;
  progress: number;
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  error?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
}

export interface CommandCenterState {
  tasks: Task[];
  quickActions: QuickAction[];
  summary: {
    completed: number;
    pending: number;
    failed: number;
    successRate: number;
  };
}
