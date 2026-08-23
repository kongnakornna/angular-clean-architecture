import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenRepository } from '../repositories/token.repository';
import { TOKEN_REPOSITORY } from '../../../../core/di/tokens';
import { Token } from '../entities/token.entity';

@Injectable({ providedIn: 'root' })
export class ListTokensUseCase {
  constructor(@Inject(TOKEN_REPOSITORY) private repo: ITokenRepository) {}

  execute(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Token[]; total: number }> {
    return this.repo.list(params);
  }
}
