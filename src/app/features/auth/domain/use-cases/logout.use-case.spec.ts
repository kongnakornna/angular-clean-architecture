import { of } from 'rxjs';
import { LogoutUseCase } from './logout.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['logout']);
    useCase = new LogoutUseCase(mockRepo);
    localStorage.setItem(APP_CONSTANTS.TOKEN_KEY, 'token');
    localStorage.setItem(APP_CONSTANTS.REFRESH_TOKEN_KEY, 'refresh');
    localStorage.setItem(APP_CONSTANTS.USER_KEY, 'user');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should call authRepo.logout and clear localStorage', () => {
    mockRepo.logout.and.returnValue(of(undefined));

    useCase.execute().subscribe(() => {
      expect(mockRepo.logout).toHaveBeenCalled();
      expect(localStorage.getItem(APP_CONSTANTS.TOKEN_KEY)).toBeNull();
      expect(localStorage.getItem(APP_CONSTANTS.REFRESH_TOKEN_KEY)).toBeNull();
      expect(localStorage.getItem(APP_CONSTANTS.USER_KEY)).toBeNull();
    });
  });
});
