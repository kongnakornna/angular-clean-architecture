import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UpdateRoleUseCase } from './update-role.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role, UpdateRoleRequest } from '../entities/role.entity';

describe('UpdateRoleUseCase', () => {
  let useCase: UpdateRoleUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockRole: Role = {
    id: 1,
    name: 'Updated Role',
    description: 'Updated description',
    permissions: ['customer.view', 'customer.create'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRequest: UpdateRoleRequest = {
    name: 'Updated Role',
    description: 'Updated description',
    permissions: ['customer.view', 'customer.create'],
  };

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['updateRole']);
    mockAuthRepository.updateRole.and.returnValue(of(mockRole));

    TestBed.configureTestingModule({
      providers: [
        UpdateRoleUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(UpdateRoleUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should update role', (done) => {
    useCase.execute(1, mockRequest).subscribe((role) => {
      expect(role).toEqual(mockRole);
      expect(mockAuthRepository.updateRole).toHaveBeenCalledWith(1, mockRequest);
      done();
    });
  });
});
