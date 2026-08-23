export type LogType = 'success' | 'ai_query' | 'warning' | 'error' | 'report' | 'workflow';

export interface LogEntry {
  time: string;
  type: LogType;
  action: string;
  detail: string;
  user: string;
  duration?: string;
  tokens?: number;
  retry?: string;
  format?: string;
}

export interface LogFilter {
  search?: string;
  date?: string;
  type?: LogType;
  user?: string;
}
