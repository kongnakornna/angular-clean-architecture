import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHostRepository } from '../repositories/host.repository';
import { HOST_REPOSITORY } from '../../../../core/di/tokens';
import { Host } from '../entities/host.entity';

@Injectable({ providedIn: 'root' })
export class CreateHostUseCase {
  constructor(@Inject(HOST_REPOSITORY) private repo: IHostRepository) {}

  execute(host: Partial<Host>): Observable<Host> {
    return this.repo.create(host);
  }
}
