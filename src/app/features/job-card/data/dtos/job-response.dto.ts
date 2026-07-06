export interface JobResponseDto {
  id: string;
  jobNumber: string;
  title: string;
  customerId: string;
  customerName: string;
  deviceType: string;
  deviceModel: string;
  serialNumber?: string;
  problemDescription: string;
  status: string;
  priority: string;
  assignedTo?: string;
  assignedTeam?: string[];
  estimatedHours?: number;
  actualHours?: number;
  partsUsed: Array<{ productId: string; productName: string; quantity: number; unitPrice: number }>;
  notes: Array<{ id: string; content: string; author: string; createdAt: string }>;
  attachments: Array<{ id: string; fileName: string; fileSize: number; fileType: string; url: string; uploadedAt: string }>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
