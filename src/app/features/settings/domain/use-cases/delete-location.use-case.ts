import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationRepository } from '../repositories/location.repository';
import { LOCATION_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class DeleteLocationUseCase {
  constructor(@Inject(LOCATION_REPOSITORY) private repo: ILocationRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.delete(id);
  }
}
