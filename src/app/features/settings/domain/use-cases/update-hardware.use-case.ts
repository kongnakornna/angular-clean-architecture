import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHardwareRepository } from '../repositories/hardware.repository';
import { HARDWARE_REPOSITORY } from '../../../../core/di/tokens';
import { Hardware } from '../entities/hardware.entity';

@Injectable({ providedIn: 'root' })
export class UpdateHardwareUseCase {
  constructor(@Inject(HARDWARE_REPOSITORY) private repo: IHardwareRepository) {}

  execute(id: string, hardware: Partial<Hardware>): Observable<Hardware> {
    return this.repo.update(id, hardware);
  }
}
