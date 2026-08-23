import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PermissionService } from './permission.service';
import { IAuthRepository } from '../../features/auth/domain/repositories/auth.repository';
import { AUTH_REPOSITORY } from '../di/tokens';
import { User } from '../../features/auth/domain/entities/user.entity';

describe('PermissionService', () => {
  let service: PermissionService;
  let mockAuthRepository: jasmine.SpyObj<IAuthRepository>;

  const mockUser: User = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    fullName: 'Test User',
    status: '1',
    phoneNumber: '1234567890',
    profileImageUrl: null,
    role: '1',
    roleId: 1,
    permissions: [],
    isSuperuser: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSuperUser: User = {
    ...mockUser,
    isSuperuser: true,
  };

  beforeEach(() => {
    mockAuthRepository = jasmine.createSpyObj('IAuthRepository', ['getPermissions']);
    mockAuthRepository.getPermissions.and.returnValue(of(['customer.view', 'customer.create', 'payment.view']));

    TestBed.configureTestingModule({
      providers: [
        PermissionService,
        { provide: AUTH_REPOSITORY, useValue: mockAuthRepository },
      ],
    });

    service = TestBed.inject(PermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load permissions from API', (done) => {
    service.loadPermissions(mockUser).subscribe((permissions) => {
      expect(permissions).toEqual(['customer.view', 'customer.create', 'payment.view']);
      done();
    });
  });

  it('should fallback to User permissions when API fails', (done) => {
    mockAuthRepository.getPermissions.and.returnValue(throwError(() => new Error('API Error')));
    const userWithPermissions = {
      ...mockUser,
      permissions: [{ id: '1', name: 'user.view', description: 'View users', module: 'user' }],
    };

    service.loadPermissions(userWithPermissions).subscribe((permissions) => {
      expect(permissions).toEqual(['user.view']);
      done();
    });
  });

  it('should fallback to empty array when no data', (done) => {
    mockAuthRepository.getPermissions.and.returnValue(throwError(() => new Error('API Error')));

    service.loadPermissions(mockUser).subscribe((permissions) => {
      expect(permissions).toEqual([]);
      done();
    });
  });

  it('should return true for isSuperuser on any permission', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockSuperUser));

    service.hasPermission('any.permission').subscribe((hasPermission) => {
      expect(hasPermission).toBeTrue();
      done();
    });
  });

  it('should check permission correctly', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    service.loadPermissions(mockUser).subscribe(() => {
      service.hasPermission('customer.view').subscribe((hasPermission) => {
        expect(hasPermission).toBeTrue();
        done();
      });
    });
  });

  it('should check hasAnyPermission correctly', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    service.loadPermissions(mockUser).subscribe(() => {
      service.hasAnyPermission(['customer.view', 'payment.view']).subscribe((hasPermission) => {
        expect(hasPermission).toBeTrue();
        done();
      });
    });
  });

  it('should filter items by permission', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    service.loadPermissions(mockUser).subscribe(() => {
      const items = [
        { label: 'Customers', permission: 'customer.view' },
        { label: 'Payments', permission: 'payment.view' },
        { label: 'Admin', permission: 'admin.view' },
      ];

      service.filterByPermission(items, (item) => item.permission).subscribe((filteredItems) => {
        expect(filteredItems.length).toBe(2);
        expect(filteredItems.map((i) => i.label)).toEqual(['Customers', 'Payments']);
        done();
      });
    });
  });

  it('should refresh permissions', (done) => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    service.loadPermissions(mockUser).subscribe(() => {
      service.refreshPermissions().subscribe((permissions) => {
        expect(permissions).toEqual(['customer.view', 'customer.create', 'payment.view']);
        done();
      });
    });
  });
});
