import { Observable } from 'rxjs';
import { Token } from '../entities/token.entity';

export interface ITokenRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Token[]; total: number }>;
  getById(id: string): Observable<Token>;
  create(token: Partial<Token>): Observable<Token>;
  revoke(id: string): Observable<void>;
}
