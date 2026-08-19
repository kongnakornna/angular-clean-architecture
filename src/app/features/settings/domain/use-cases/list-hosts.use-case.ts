import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHostRepository } from '../repositories/host.repository';
import { HOST_REPOSITORY } from '../../../../core/di/tokens';
import { Host } from '../entities/host.entity';

@Injectable({ providedIn: 'root' })
export class ListHostsUseCase {
  constructor(@Inject(HOST_REPOSITORY) private repo: IHostRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Host[]; total: number }> {
    return this.repo.list(params);
  }
}
