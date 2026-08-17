import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DeleteRoleUseCase } from './delete-role.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';

describe('DeleteRoleUseCase', () => {
  let useCase: DeleteRoleUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['deleteRole']);
    mockAuthRepository.deleteRole.and.returnValue(of(void 0));

    TestBed.configureTestingModule({
      providers: [
        DeleteRoleUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(DeleteRoleUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should delete role', (done) => {
    useCase.execute(1).subscribe(() => {
      expect(mockAuthRepository.deleteRole).toHaveBeenCalledWith(1);
      done();
    });
  });
});
