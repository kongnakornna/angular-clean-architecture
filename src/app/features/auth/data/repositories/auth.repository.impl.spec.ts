import { TestBed } from '@angular/core/testing';
import { AuthRepositoryImpl } from './auth.repository.impl';
import { AuthApiDataSource } from '../datasources/auth.api.datasource';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_CONFIG } from '../../../../core/config/app.config';

describe('AuthRepositoryImpl', () => {
  let repository: AuthRepositoryImpl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthRepositoryImpl,
        AuthApiDataSource,
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://localhost:1080/api/v1', production: false } },
      ],
    }).compileComponents();

    repository = TestBed.inject(AuthRepositoryImpl);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });
});
