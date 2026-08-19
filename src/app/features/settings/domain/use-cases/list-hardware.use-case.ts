import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHardwareRepository } from '../repositories/hardware.repository';
import { HARDWARE_REPOSITORY } from '../../../../core/di/tokens';
import { Hardware } from '../entities/hardware.entity';

@Injectable({ providedIn: 'root' })
export class ListHardwareUseCase {
  constructor(@Inject(HARDWARE_REPOSITORY) private repo: IHardwareRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Hardware[]; total: number }> {
    return this.repo.list(params);
  }
}
