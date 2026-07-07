import { of } from 'rxjs';
import { LoginUseCase } from './login.use-case';
import { IAuthRepository } from '../repositories/auth.repository';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['login']);
    useCase = new LoginUseCase(mockRepo);
  });

  it('should call authRepo.login and return auth response', () => {
    const credentials = { username: 'admin', password: 'P@ssw0rd' };
    const response = {
      user: {
        id: '1', username: 'admin', email: 'admin@test.com', fullName: 'Admin User',
        status: 'ACTIVE', phoneNumber: '0000000000', profileImageUrl: null,
        role: 'admin', permissions: [], createdAt: new Date(), updatedAt: new Date(),
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
    };
    mockRepo.login.and.returnValue(of(response));

    useCase.execute(credentials).subscribe((res) => {
      expect(res.accessToken).toBe('access-token');
      expect(mockRepo.login).toHaveBeenCalledWith(credentials);
    });
  });
});
