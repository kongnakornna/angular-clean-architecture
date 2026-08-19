import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenRepository } from '../repositories/token.repository';
import { TOKEN_REPOSITORY } from '../../../../core/di/tokens';
import { Token } from '../entities/token.entity';

@Injectable({ providedIn: 'root' })
export class CreateTokenUseCase {
  constructor(@Inject(TOKEN_REPOSITORY) private repo: ITokenRepository) {}

  execute(token: Partial<Token>): Observable<Token> {
    return this.repo.create(token);
  }
}
