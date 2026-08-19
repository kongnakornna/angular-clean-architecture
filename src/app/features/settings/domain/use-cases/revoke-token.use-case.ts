import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenRepository } from '../repositories/token.repository';
import { TOKEN_REPOSITORY } from '../../../../core/di/tokens';

@Injectable({ providedIn: 'root' })
export class RevokeTokenUseCase {
  constructor(@Inject(TOKEN_REPOSITORY) private repo: ITokenRepository) {}

  execute(id: string): Observable<void> {
    return this.repo.revoke(id);
  }
}
