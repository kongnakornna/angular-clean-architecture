import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHardwareRepository } from '../repositories/hardware.repository';
import { HARDWARE_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteHardwareUseCase {
  constructor(@Inject(HARDWARE_REPOSITORY) private repo: IHardwareRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
