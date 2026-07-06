export interface CreateWebOrderRequestDto {
  customerId: string;
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: string;
  notes?: string;
}
