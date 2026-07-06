import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryRepository } from '../repositories/inventory.repository';
import { INVENTORY_REPOSITORY } from '../../../../core/di/tokens';
import { Product } from '../entities/product.entity';

@Injectable({ providedIn: 'root' })
export class ListProductsUseCase {
  constructor(@Inject(INVENTORY_REPOSITORY) private repo: IInventoryRepository) {}

  execute(params?: { search?: string; categoryId?: string; page?: number; pageSize?: number }): Observable<{ data: Product[]; total: number }> {
    return this.repo.listProducts(params);
  }
}
