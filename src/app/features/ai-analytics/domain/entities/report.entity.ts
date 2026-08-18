export type ReportType = 'ai_generated' | 'human_review' | 'auto_generated';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  createdAt: string;
  format: string[];
  folder?: string;
}

export interface ReportFolder {
  name: string;
  count: number;
}
