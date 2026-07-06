export interface WebOrderResponseDto {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ id: string; productId: string; productName: string; quantity: number; unitPrice: number; total: number }>;
  subtotal: number;
  shippingCost: number;
  vat: number;
  total: number;
  status: string;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
