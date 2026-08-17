import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListRolesUseCase } from './list-roles.use-case';
import { IAuthRepository } from '../repositories/auth.repository';
import { AUTH_REPOSITORY } from '../../../../core/di/tokens';
import { Role } from '../entities/role.entity';

describe('ListRolesUseCase', () => {
  let useCase: ListRolesUseCase;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockRoles: Role[] = [
    {
      id: 1,
      name: 'Admin',
      description: 'Full access',
      permissions: ['customer.view', 'customer.create'],
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Staff',
      description: 'Limited access',
      permissions: ['customer.view'],
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['getRoles']);
    mockAuthRepository.getRoles.and.returnValue(of(mockRoles));

    TestBed.configureTestingModule({
      providers: [
        ListRolesUseCase,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    useCase = TestBed.inject(ListRolesUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return role list from repository', (done) => {
    useCase.execute().subscribe((roles) => {
      expect(roles).toEqual(mockRoles);
      expect(mockAuthRepository.getRoles).toHaveBeenCalled();
      done();
    });
  });
});
