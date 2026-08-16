import { Observable } from 'rxjs';
import { CreateOrderRequest, OrderResponse } from '../entities/order.entity';

export interface IOrderRepository {
  createOrder(data: CreateOrderRequest): Observable<OrderResponse>;
}
