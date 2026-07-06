import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurchaseOrderRepository } from '../repositories/purchase-order.repository';
import { PURCHASE_ORDER_REPOSITORY } from '../../../../core/di/tokens';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@Injectable({ providedIn: 'root' })
export class CreatePurchaseOrderUseCase {
  constructor(@Inject(PURCHASE_ORDER_REPOSITORY) private repo: IPurchaseOrderRepository) {}

  execute(po: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    return this.repo.create(po);
  }
}
