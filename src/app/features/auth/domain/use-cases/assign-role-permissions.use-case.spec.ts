import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AssignRolePermissionsUseCase } from './assign-role-permissions.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role, AssignRolePermissionsRequest } from '../entities/role.entity';

describe('AssignRolePermissionsUseCase', () => {
  let useCase: AssignRolePermissionsUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockRole: Role = {
    id: 1,
    name: 'Admin',
    description: 'Full access',
    permissions: ['customer.view', 'customer.create', 'payment.view'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRequest: AssignRolePermissionsRequest = {
    permissions: ['customer.view', 'customer.create', 'payment.view'],
  };

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['assignRolePermissions']);
    mockAuthRepository.assignRolePermissions.and.returnValue(of(mockRole));

    TestBed.configureTestingModule({
      providers: [
        AssignRolePermissionsUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(AssignRolePermissionsUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should assign permissions to role', (done) => {
    useCase.execute(1, mockRequest).subscribe((role) => {
      expect(role).toEqual(mockRole);
      expect(mockAuthRepository.assignRolePermissions).toHaveBeenCalledWith(1, mockRequest);
      done();
    });
  });
});
