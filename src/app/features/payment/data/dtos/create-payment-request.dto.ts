export interface CreatePaymentRequestDto {
  invoiceId?: string;
  customerId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  reference?: string;
  notes?: string;
}
