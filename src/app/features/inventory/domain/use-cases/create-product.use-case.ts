import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryRepository } from '../repositories/inventory.repository';
import { INVENTORY_REPOSITORY } from '../../../../core/di/tokens';
import { Product } from '../entities/product.entity';

@Injectable({ providedIn: 'root' })
export class CreateProductUseCase {
  constructor(@Inject(INVENTORY_REPOSITORY) private repo: IInventoryRepository) {}

  execute(product: Partial<Product>): Observable<Product> {
    return this.repo.createProduct(product);
  }
}
