import { of } from 'rxjs';
import { LoginUseCase } from './login.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { UserRole } from '../../../../core/constants/enums';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['login']);
    useCase = new LoginUseCase(mockRepo);
  });

  it('should call authRepo.login and return auth response', () => {
    const credentials = { email: 'test@test.com', password: 'Test@1234' };
    const response = {
      user: {
        id: '1', email: 'test@test.com', firstName: 'Test', lastName: 'User',
        role: UserRole.ADMIN, permissions: [], isActive: true,
        createdAt: new Date(), updatedAt: new Date(),
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
    };
    mockRepo.login.and.returnValue(of(response));

    useCase.execute(credentials).subscribe((res) => {
      expect(res.accessToken).toBe('access-token');
      expect(mockRepo.login).toHaveBeenCalledWith(credentials);
    });
  });
});
