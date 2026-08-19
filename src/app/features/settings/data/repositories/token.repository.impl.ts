import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ITokenRepository } from '../../domain/repositories/token.repository';
import { Token } from '../../domain/entities/token.entity';
import { TokenApiDataSource } from '../datasources/token.api.datasource';

@Injectable({ providedIn: 'root' })
export class TokenRepositoryImpl implements ITokenRepository {
  constructor(private dataSource: TokenApiDataSource) {}

  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: Token[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Token> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(token: Partial<Token>): Observable<Token> {
    return this.dataSource.create(token).pipe(map((dto) => this.mapToEntity(dto)));
  }

  revoke(id: string): Observable<void> {
    return this.dataSource.revoke(id);
  }

  private mapToEntity(dto: any): Token {
    return {
      id: dto.id,
      name: dto.name,
      token: dto.token,
      permissions: dto.permissions,
      expiresAt: new Date(dto.expiresAt),
      isActive: dto.isActive,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
