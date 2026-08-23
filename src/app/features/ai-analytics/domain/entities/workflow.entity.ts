export type NodeType = 'data_source' | 'transform' | 'ai_analyze' | 'visualize' | 'send_email' | 'schedule' | 'alert' | 'filter' | 'junction';

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  config?: Record<string, unknown>;
  status?: 'idle' | 'running' | 'success' | 'failed';
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'running' | 'stopped';
  createdAt: string;
  updatedAt: string;
}

export const NODE_TEMPLATES: { type: NodeType; label: string; icon: string }[] = [
  { type: 'data_source', label: 'Data Source', icon: 'download' },
  { type: 'transform', label: 'Transform', icon: 'refresh' },
  { type: 'ai_analyze', label: 'AI Analyze', icon: 'robot' },
  { type: 'visualize', label: 'Visualize', icon: 'chart-bar' },
  { type: 'send_email', label: 'Send Email', icon: 'mail' },
  { type: 'schedule', label: 'Schedule', icon: 'clock' },
  { type: 'alert', label: 'Alert', icon: 'bell' },
];
