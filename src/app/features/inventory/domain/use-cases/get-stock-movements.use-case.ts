import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryRepository } from '../repositories/inventory.repository';
import { INVENTORY_REPOSITORY } from '../../../../core/di/tokens';
import { StockMovement } from '../entities/product.entity';

@Injectable({ providedIn: 'root' })
export class GetStockMovementsUseCase {
  constructor(@Inject(INVENTORY_REPOSITORY) private repo: IInventoryRepository) {}

  execute(id: string): Observable<StockMovement[]> {
    return this.repo.getStockMovements(id);
  }
}
