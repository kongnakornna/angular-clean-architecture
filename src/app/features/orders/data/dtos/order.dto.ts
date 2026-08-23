export interface CreateOrderRequestDto {
  product_id: string;
  quantity: number;
}

export interface OrderResponseDto {
  order_id: string;
  status: string;
  message: string;
}
