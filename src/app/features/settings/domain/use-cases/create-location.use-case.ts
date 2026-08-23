import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationRepository } from '../repositories/location.repository';
import { LOCATION_REPOSITORY } from '../../../../core/di/tokens';
import { Location } from '../entities/location.entity';

@Injectable({ providedIn: 'root' })
export class CreateLocationUseCase {
  constructor(@Inject(LOCATION_REPOSITORY) private repo: ILocationRepository) {}

  execute(location: Partial<Location>): Observable<Location> {
    return this.repo.create(location);
  }
}
