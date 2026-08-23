export interface CreateOrderRequest {
  productId: string;
  quantity: number;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
}
