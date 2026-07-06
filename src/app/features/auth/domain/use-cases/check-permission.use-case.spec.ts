import { of } from 'rxjs';
import { CheckPermissionUseCase } from './check-permission.use-case';
import { IAuthRepository } from '../repositories/auth.repository';

describe('CheckPermissionUseCase', () => {
  let useCase: CheckPermissionUseCase;
  let mockRepo: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IAuthRepository', ['hasPermission']);
    useCase = new CheckPermissionUseCase(mockRepo);
  });

  it('should call authRepo.hasPermission and return true', () => {
    mockRepo.hasPermission.and.returnValue(of(true));

    useCase.execute('customer:create').subscribe((result) => {
      expect(result).toBeTrue();
      expect(mockRepo.hasPermission).toHaveBeenCalledWith('customer:create');
    });
  });

  it('should call authRepo.hasPermission and return false', () => {
    mockRepo.hasPermission.and.returnValue(of(false));

    useCase.execute('customer:delete').subscribe((result) => {
      expect(result).toBeFalse();
      expect(mockRepo.hasPermission).toHaveBeenCalledWith('customer:delete');
    });
  });
});
