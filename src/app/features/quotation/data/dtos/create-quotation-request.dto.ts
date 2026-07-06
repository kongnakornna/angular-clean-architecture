export interface CreateQuotationRequestDto {
  customerId: string;
  subject: string;
  items: Array<{ description: string; quantity: number; unitPrice: number; discount: number }>;
  validUntil: string;
  notes?: string;
}
