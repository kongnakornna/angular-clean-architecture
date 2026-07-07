import { TestBed } from '@angular/core/testing';
import { AuthRepositoryImpl } from './auth.repository.impl';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthRepositoryImpl', () => {
  let repository: AuthRepositoryImpl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthRepositoryImpl, AuthApiDataSource],
    }).compileComponents();

    repository = TestBed.inject(AuthRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
