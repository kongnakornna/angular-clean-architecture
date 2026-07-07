import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthApiDataSource } from './auth.api.datasource';

describe('AuthApiDataSource', () => {
  let datasource: AuthApiDataSource;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiDataSource],
    }).compileComponents();

    datasource = TestBed.inject(AuthApiDataSource);
  });

  it('should be created', () => {
    expect(datasource).toBeTruthy();
  });
});
