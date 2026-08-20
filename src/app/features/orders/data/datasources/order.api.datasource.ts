import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api.config';
import { ApiFallbackService } from '../../../../core/services/api-fallback.service';
import { CreateOrderRequestDto, OrderResponseDto } from '../dtos/order.dto';

@Injectable({ providedIn: 'root' })
export class OrderApiDataSource {
  private http = inject(HttpClient);
  private fallbackService = inject(ApiFallbackService);

  createOrder(data: CreateOrderRequestDto): Observable<OrderResponseDto> {
    return this.http.post<OrderResponseDto>(`${this.fallbackService.getActiveBaseUrl()}${API_ENDPOINTS.orders.create}`, data);
  }
}
