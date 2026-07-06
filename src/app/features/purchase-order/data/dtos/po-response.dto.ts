export interface POResponseDto {
  id: string;
  poNumber: string;
  quotationId?: string;
  supplierName: string;
  items: Array<{ id: string; productId: string; productName: string; quantity: number; unitPrice: number; total: number }>;
  subtotal: number;
  vat: number;
  total: number;
  status: string;
  expectedDelivery?: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}
