import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../../../core/config/app.config';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { CreateOrderRequestDto, OrderResponseDto } from '../dtos/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderApiDataSource {
  private http = inject(HttpClient);
  private cfg = inject(APP_CONFIG);

  createOrder(data: CreateOrderRequestDto): Observable<OrderResponseDto> {
    return this.http.post<OrderResponseDto>(`${this.cfg.apiBaseUrl}${API_ENDPOINTS.orders.create}`, data);
  }
}
