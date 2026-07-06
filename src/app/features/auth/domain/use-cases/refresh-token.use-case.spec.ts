import { of } from 'rxjs';
import { RefreshTokenUseCase } from './refresh-token.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AuthResponse } from '../entities/user.entity';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

describe('RefreshTokenUseCase', () => {
  let useCase: RefreshTokenUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['refreshToken']);
    useCase = new RefreshTokenUseCase(mockRepo);
  });

  it('should call authRepo.refreshToken and update localStorage', () => {
    const response: AuthResponse = {
      user: {
        id: '1', email: 'test@test.com', firstName: 'Test', lastName: 'User',
        role: 'admin' as any, permissions: [], isActive: true,
        createdAt: new Date(), updatedAt: new Date(),
      },
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      expiresIn: 3600,
    };
    mockRepo.refreshToken.and.returnValue(of(response));

    useCase.execute().subscribe((res) => {
      expect(res.accessToken).toBe('new-access-token');
      expect(res.refreshToken).toBe('new-refresh-token');
      expect(mockRepo.refreshToken).toHaveBeenCalled();
      expect(localStorage.getItem(APP_CONSTANTS.TOKEN_KEY)).toBe('new-access-token');
      expect(localStorage.getItem(APP_CONSTANTS.REFRESH_TOKEN_KEY)).toBe('new-refresh-token');
    });
  });
});
