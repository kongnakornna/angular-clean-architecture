export interface CreatePORequestDto {
  quotationId?: string;
  supplierName: string;
  items: Array<{ productId: string; productName: string; quantity: number; unitPrice: number }>;
  expectedDelivery?: string;
  notes?: string;
}
