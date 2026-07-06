export interface QuotationResponseDto {
  id: string;
  quotationNumber: string;
  customerId: string;
  customerName: string;
  subject: string;
  items: Array<{ id: string; description: string; quantity: number; unitPrice: number; discount: number; total: number }>;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  status: string;
  validUntil: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}
