import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWebOrderRepository } from '../repositories/web-order.repository';
import { WEB_ORDER_REPOSITORY } from '../../../../core/di/tokens';
import { WebOrder } from '../entities/web-order.entity';

@Injectable({ providedIn: 'root' })
export class UpdateWebOrderStatusUseCase {
  constructor(@Inject(WEB_ORDER_REPOSITORY) private repo: IWebOrderRepository) {}

  execute(id: string, status: string): Observable<WebOrder> {
    return this.repo.updateStatus(id, status);
  }
}
