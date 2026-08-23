import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INodeRedRepository } from '../repositories/nodered.repository';
import { NODERED_REPOSITORY } from '../../../../core/di/tokens';
import { NodeRed } from '../entities/nodered.entity';

@Injectable({ providedIn: 'root' })
export class ListNodeRedUseCase {
  constructor(@Inject(NODERED_REPOSITORY) private repo: INodeRedRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: NodeRed[]; total: number }> {
    return this.repo.list(params);
  }
}
