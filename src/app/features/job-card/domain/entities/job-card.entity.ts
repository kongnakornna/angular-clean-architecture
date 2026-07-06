import { JobStatus, JobPriority } from '../../../../core/constants/enums';

export interface PartUsed {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface JobNote {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedAt: Date;
}

export interface JobCard {
  id: string;
  jobNumber: string;
  title: string;
  customerId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  serialNumber?: string;
  problemDescription: string;
  status: JobStatus;
  priority: JobPriority;
  assignedTo?: string;
  assignedTeam?: string[];
  estimatedHours?: number;
  actualHours?: number;
  partsUsed: PartUsed[];
  notes: JobNote[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
