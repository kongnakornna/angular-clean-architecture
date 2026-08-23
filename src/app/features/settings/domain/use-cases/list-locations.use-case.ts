import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationRepository } from '../repositories/location.repository';
import { LOCATION_REPOSITORY } from '../../../../core/di/tokens';
import { Location } from '../entities/location.entity';

@Injectable({ providedIn: 'root' })
export class ListLocationsUseCase {
  constructor(@Inject(LOCATION_REPOSITORY) private repo: ILocationRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Location[]; total: number }> {
    return this.repo.list(params);
  }
}
