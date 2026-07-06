import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryRepository } from '../repositories/inventory.repository';
import { INVENTORY_REPOSITORY } from '../../../../core/di/tokens';
import { Product } from '../entities/product.entity';

@Injectable({ providedIn: 'root' })
export class GetProductUseCase {
  constructor(@Inject(INVENTORY_REPOSITORY) private repo: IInventoryRepository) {}

  execute(id: string): Observable<Product> {
    return this.repo.getProduct(id);
  }
}
