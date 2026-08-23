import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetRoleUseCase } from './get-role.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role } from '../entities/role.entity';

describe('GetRoleUseCase', () => {
  let useCase: GetRoleUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockRole: Role = {
    id: 1,
    name: 'Admin',
    description: 'Full access',
    permissions: ['customer.view', 'customer.create'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['getRole']);
    mockAuthRepository.getRole.and.returnValue(of(mockRole));

    TestBed.configureTestingModule({
      providers: [
        GetRoleUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(GetRoleUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return role by id', (done) => {
    useCase.execute(1).subscribe((role) => {
      expect(role).toEqual(mockRole);
      expect(mockAuthRepository.getRole).toHaveBeenCalledWith(1);
      done();
    });
  });
});
