import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthApiDataSource } from './auth.api.datasource';
import { APP_CONFIG, DEFAULT_APP_CONFIG } from '../../../../core/config/app.config';

describe('AuthApiDataSource', () => {
  let datasource: AuthApiDataSource;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthApiDataSource,
        { provide: APP_CONFIG, useValue: DEFAULT_APP_CONFIG },
      ],
    }).compileComponents();

    datasource = TestBed.inject(AuthApiDataSource);
  });

  it('should be created', () => {
    expect(datasource).toBeTruthy();
  });
});
