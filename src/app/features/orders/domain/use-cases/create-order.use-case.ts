import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderRepository } from '../repositories/order.repository';
import { ORDER_REPOSITORY } from '../../../../core/di/tokens';
import { CreateOrderRequest, OrderResponse } from '../entities/order.entity';

@Injectable({ providedIn: 'root' })
export class CreateOrderUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private repo: IOrderRepository) {}

  execute(data: CreateOrderRequest): Observable<OrderResponse> {
    return this.repo.createOrder(data);
  }
}
