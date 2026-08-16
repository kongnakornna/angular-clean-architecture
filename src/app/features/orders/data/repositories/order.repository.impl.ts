import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderRequest, OrderResponse } from '../../domain/entities/order.entity';
import { OrderApiDataSource } from '../datasources/order.api.datasource';
import { CreateOrderRequestDto, OrderResponseDto } from '../dtos/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(private ds: OrderApiDataSource) {}

  createOrder(data: CreateOrderRequest): Observable<OrderResponse> {
    const dto: CreateOrderRequestDto = {
      product_id: data.productId,
      quantity: data.quantity,
    };
    return this.ds.createOrder(dto).pipe(map((r) => this.toEntity(r)));
  }

  private toEntity(d: OrderResponseDto): OrderResponse {
    return {
      orderId: d.order_id,
      status: d.status,
      message: d.message,
    };
  }
}
