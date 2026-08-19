import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INodeRedRepository } from '../repositories/nodered.repository';
import { NODERED_REPOSITORY } from '../../../../core/di/tokens';
import { NodeRed } from '../entities/nodered.entity';

@Injectable({ providedIn: 'root' })
export class UpdateNodeRedUseCase {
  constructor(@Inject(NODERED_REPOSITORY) private repo: INodeRedRepository) {}

  execute(id: string, nodered: Partial<NodeRed>): Observable<NodeRed> {
    return this.repo.update(id, nodered);
  }
}
