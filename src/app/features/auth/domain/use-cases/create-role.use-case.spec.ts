import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateRoleUseCase } from './create-role.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role, CreateRoleRequest } from '../entities/role.entity';

describe('CreateRoleUseCase', () => {
  let useCase: CreateRoleUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockRole: Role = {
    id: 1,
    name: 'New Role',
    description: 'New role description',
    permissions: ['customer.view'],
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRequest: CreateRoleRequest = {
    name: 'New Role',
    description: 'New role description',
    permissions: ['customer.view'],
  };

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['createRole']);
    mockAuthRepository.createRole.and.returnValue(of(mockRole));

    TestBed.configureTestingModule({
      providers: [
        CreateRoleUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(CreateRoleUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should create role with permissions', (done) => {
    useCase.execute(mockRequest).subscribe((role) => {
      expect(role).toEqual(mockRole);
      expect(mockAuthRepository.createRole).toHaveBeenCalledWith(mockRequest);
      done();
    });
  });
});
