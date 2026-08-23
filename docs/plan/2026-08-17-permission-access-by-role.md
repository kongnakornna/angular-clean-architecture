# Implementation Plan: Permission Access by Role

## ภาพรวมการแก้ไข

| # | Layer | ไฟล์ | สิ่งที่แก้ |
|---|-------|------|-----------|
| 1 | model | `src/app/features/auth/domain/entities/role.entity.ts` | เพิ่ม Role interface |
| 2 | model | `src/app/features/auth/domain/entities/permission.entity.ts` | เพิ่ม PermissionAction type |
| 3 | model | `src/app/features/auth/data/dtos/role.dto.ts` | เพิ่ม Role DTO |
| 4 | model | `src/app/features/auth/data/dtos/permission.dto.ts` | เพิ่ม Permission DTO |
| 5 | repository | `src/app/features/auth/domain/repositories/auth.repository.ts` | เพิ่ม role CRUD methods |
| 6 | datasource | `src/app/features/auth/data/datasources/auth.api.datasource.ts` | เพิ่ม role CRUD API calls |
| 7 | repository | `src/app/features/auth/data/repositories/auth.repository.impl.ts` | implement role CRUD |
| 8 | use-case | `src/app/features/auth/domain/use-cases/` | เพิ่ม 6 role use-cases |
| 9 | service | `src/app/core/services/permission.service.ts` | สร้าง central PermissionService |
| 10 | config | `src/app/core/config/menu.config.ts` | สร้าง menu config |
| 11 | config | `src/app/core/config/route-permission.config.ts` | สร้าง route permission map |
| 12 | guard | `src/app/shared/guards/permission.guard.ts` | Fix stub → ใช้ PermissionService |
| 13 | routing | `src/app/app-routing.module.ts` | ใส่ permission ทุก route |
| 14 | component | `src/app/layouts/sidebar/sidebar.component.ts` | Filter menu ตาม permission |
| 15 | component | `src/app/features/auth/presentation/pages/role-list/` | Rewrite role-list จาก API |
| 16 | component | `src/app/features/auth/presentation/pages/role-create/` | สร้าง role-create page |
| 17 | component | `src/app/features/auth/presentation/pages/role-edit/` | สร้าง role-edit page |
| 18 | component | `src/app/features/auth/presentation/pages/role-detail/` | สร้าง role-detail page |
| 19 | component | `src/app/shared/components/access-denied/` | สร้าง Access Denied page |
| 20 | component | `src/app/shared/components/permission-checkbox/` | สร้าง PermissionCheckbox component |
| 21 | di | `src/app/core/di/tokens.ts` | เพิ่ม ROLE_REPOSITORY token |
| 22 | di | `src/app/core/di/providers.ts` | เพิ่ม role providers |
| 23 | test | `src/app/core/services/permission.service.spec.ts` | Unit test PermissionService |
| 24 | test | `src/app/shared/guards/permission.guard.spec.ts` | Unit test PermissionGuard |
| 25 | test | role use-case specs | Unit test role CRUD use-cases |

---

## Section 1: Model Layer — Role Entity

**ไฟล์:** `src/app/features/auth/domain/entities/role.entity.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** เพิ่ม Role interface

```typescript
export interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateRoleRequest {
  name: string
  description: string
  permissions: string[]
  isDefault?: boolean
}

export interface UpdateRoleRequest {
  name?: string
  description?: string
  permissions?: string[]
  isDefault?: boolean
}

export interface AssignRolePermissionsRequest {
  permissions: string[]
}
```

---

## Section 2: Model Layer — Permission Entity

**ไฟล์:** `src/app/features/auth/domain/entities/permission.entity.ts` (แก้ไข)

**From:** มี interface Permission อยู่แล้ว
**To:** เพิ่ม PermissionAction type

```typescript
// เพิ่มข้างล่าง interface Permission ที่มีอยู่
export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve'

export interface PermissionGroup {
  module: string
  actions: PermissionAction[]
}
```

---

## Section 3: Data Layer — Role DTO

**ไฟล์:** `src/app/features/auth/data/dtos/role.dto.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** เพิ่ม Role DTO สำหรับ map API response

```typescript
export interface RoleResponseDto {
  id: number
  name: string
  description: string
  permissions: string[]
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface RoleListResponseDto {
  roles: RoleResponseDto[]
  total: number
}

export interface CreateRoleRequestDto {
  name: string
  description: string
  permissions: string[]
  is_default?: boolean
}

export interface UpdateRoleRequestDto {
  name?: string
  description?: string
  permissions?: string[]
  is_default?: boolean
}

export interface AssignRolePermissionsRequestDto {
  permissions: string[]
}
```

---

## Section 4: Data Layer — Permission DTO

**ไฟล์:** `src/app/features/auth/data/dtos/permission.dto.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** เพิ่ม Permission DTO

```typescript
export interface PermissionResponseDto {
  id: number
  name: string
  description: string
  module: string
}

export interface PermissionListResponseDto {
  permissions: PermissionResponseDto[]
}
```

---

## Section 5: Domain Layer — Auth Repository Interface

**ไฟล์:** `src/app/features/auth/domain/repositories/auth.repository.ts` (แก้ไข)

**From:** มี methods สำหรับ auth อยู่แล้ว
**To:** เพิ่ม role CRUD methods

เพิ่ม methods ใหม่ใน interface `IAuthRepository`:

```typescript
// Role CRUD
getRoles(): Observable<Role[]>
getRole(id: number): Observable<Role>
createRole(request: CreateRoleRequest): Observable<Role>
updateRole(id: number, request: UpdateRoleRequest): Observable<Role>
deleteRole(id: number): Observable<void>
assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Observable<Role>

// Permissions
getPermissions(): Observable<string[]>  // มีอยู่แล้ว
hasPermission(permission: string): Observable<boolean>  // มีอยู่แล้ว
getAllPermissions(): Observable<Permission[]>
```

---

## Section 6: Data Layer — Auth API Datasource

**ไฟล์:** `src/app/features/auth/data/datasources/auth.api.datasource.ts` (แก้ไข)

**From:** มี API calls สำหรับ auth อยู่แล้ว
**To:** เพิ่ม role CRUD API calls

เพิ่ม methods ใหม่:

```typescript
getRoles(): Observable<RoleListResponseDto> {
  return this.http.get<RoleListResponseDto>(`${this.baseUrl}/roles`)
}

getRole(id: number): Observable<RoleResponseDto> {
  return this.http.get<RoleResponseDto>(`${this.baseUrl}/roles/${id}`)
}

createRole(request: CreateRoleRequestDto): Observable<RoleResponseDto> {
  return this.http.post<RoleResponseDto>(`${this.baseUrl}/roles`, request)
}

updateRole(id: number, request: UpdateRoleRequestDto): Observable<RoleResponseDto> {
  return this.http.patch<RoleResponseDto>(`${this.baseUrl}/roles/${id}`, request)
}

deleteRole(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/roles/${id}`)
}

assignRolePermissions(id: number, request: AssignRolePermissionsRequestDto): Observable<RoleResponseDto> {
  return this.http.patch<RoleResponseDto>(`${this.baseUrl}/roles/${id}/permissions`, request)
}

getAllPermissions(): Observable<PermissionListResponseDto> {
  return this.http.get<PermissionListResponseDto>(`${this.baseUrl}/permissions`)
}
```

---

## Section 7: Data Layer — Auth Repository Implementation

**ไฟล์:** `src/app/features/auth/data/repositories/auth.repository.impl.ts` (แก้ไข)

**From:** implement auth methods อยู่แล้ว
**To:** implement role CRUD + map DTO → Entity

เพิ่ม methods ใหม่ที่ implement `IAuthRepository`:

```typescript
getRoles(): Observable<Role[]> {
  return this.apiDataSource.getRoles().pipe(
    map(response => response.roles.map(dto => this.mapRoleDtoToEntity(dto)))
  )
}

getRole(id: number): Observable<Role> {
  return this.apiDataSource.getRole(id).pipe(
    map(dto => this.mapRoleDtoToEntity(dto))
  )
}

createRole(request: CreateRoleRequest): Observable<Role> {
  const dto: CreateRoleRequestDto = {
    name: request.name,
    description: request.description,
    permissions: request.permissions,
    is_default: request.isDefault
  }
  return this.apiDataSource.createRole(dto).pipe(
    map(response => this.mapRoleDtoToEntity(response))
  )
}

updateRole(id: number, request: UpdateRoleRequest): Observable<Role> {
  const dto: UpdateRoleRequestDto = {
    name: request.name,
    description: request.description,
    permissions: request.permissions,
    is_default: request.isDefault
  }
  return this.apiDataSource.updateRole(id, dto).pipe(
    map(response => this.mapRoleDtoToEntity(response))
  )
}

deleteRole(id: number): Observable<void> {
  return this.apiDataSource.deleteRole(id)
}

assignRolePermissions(id: number, request: AssignRolePermissionsRequest): Observable<Role> {
  return this.apiDataSource.assignRolePermissions(id, { permissions: request.permissions }).pipe(
    map(response => this.mapRoleDtoToEntity(response))
  )
}

getAllPermissions(): Observable<Permission[]> {
  return this.apiDataSource.getAllPermissions().pipe(
    map(response => response.permissions.map(dto => this.mapPermissionDtoToEntity(dto)))
  )
}

private mapRoleDtoToEntity(dto: RoleResponseDto): Role {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    permissions: dto.permissions,
    isDefault: dto.is_default,
    createdAt: new Date(dto.created_at),
    updatedAt: new Date(dto.updated_at)
  }
}

private mapPermissionDtoToEntity(dto: PermissionResponseDto): Permission {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    module: dto.module
  }
}
```

---

## Section 8: Use Cases — Role CRUD

**ไฟล์:** `src/app/features/auth/domain/use-cases/` (ใหม่ 6 ไฟล์)

**From:** ไม่มี use cases สำหรับ role
**To:** เพิ่ม 6 role use-cases

### 8.1 list-roles.use-case.ts

```typescript
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { IAuthRepository } from '../../repositories/auth.repository'
import { AUTH_REPOSITORY } from '../../../../core/di/tokens'
import { Role } from '../../entities/role.entity'

@Injectable()
export class ListRolesUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(): Observable<Role[]> {
    return this.authRepository.getRoles()
  }
}
```

### 8.2 get-role.use-case.ts

```typescript
@Injectable()
export class GetRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(id: number): Observable<Role> {
    return this.authRepository.getRole(id)
  }
}
```

### 8.3 create-role.use-case.ts

```typescript
@Injectable()
export class CreateRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(request: CreateRoleRequest): Observable<Role> {
    return this.authRepository.createRole(request)
  }
}
```

### 8.4 update-role.use-case.ts

```typescript
@Injectable()
export class UpdateRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(id: number, request: UpdateRoleRequest): Observable<Role> {
    return this.authRepository.updateRole(id, request)
  }
}
```

### 8.5 delete-role.use-case.ts

```typescript
@Injectable()
export class DeleteRoleUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(id: number): Observable<void> {
    return this.authRepository.deleteRole(id)
  }
}
```

### 8.6 assign-role-permissions.use-case.ts

```typescript
@Injectable()
export class AssignRolePermissionsUseCase {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)

  execute(id: number, request: AssignRolePermissionsRequest): Observable<Role> {
    return this.authRepository.assignRolePermissions(id, request)
  }
}
```

---

## Section 9: Service — PermissionService

**ไฟล์:** `src/app/core/services/permission.service.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** สร้าง central PermissionService

```typescript
import { Injectable, inject } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { IAuthRepository } from '../../features/auth/domain/repositories/auth.repository'
import { AUTH_REPOSITORY } from '../di/tokens'
import { User } from '../../features/auth/domain/entities/user.entity'

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private authRepository = inject<IAuthRepository>(AUTH_REPOSITORY)
  private permissions$ = new BehaviorSubject<string[]>([])
  private loaded = false

  loadPermissions(user: User): Observable<string[]> {
    if (this.loaded) {
      return this.permissions$.asObservable()
    }

    return this.authRepository.getPermissions().pipe(
      tap(permissions => {
        this.permissions$.next(permissions)
        this.loaded = true
      }),
      catchError(() => {
        // Fallback 1: ใช้ User.permissions
        if (user.permissions && user.permissions.length > 0) {
          this.permissions$.next(user.permissions)
        } else {
          // Fallback 2: empty array
          this.permissions$.next([])
        }
        this.loaded = true
        return this.permissions$.asObservable()
      })
    )
  }

  hasPermission(permission: string): Observable<boolean> {
    // isSuperuser bypass
    const user = this.getCurrentUser()
    if (user?.isSuperuser) {
      return of(true)
    }

    return this.permissions$.pipe(
      map(permissions => permissions.includes(permission))
    )
  }

  hasAnyPermission(permissions: string[]): Observable<boolean> {
    const user = this.getCurrentUser()
    if (user?.isSuperuser) {
      return of(true)
    }

    return this.permissions$.pipe(
      map(userPermissions => permissions.some(p => userPermissions.includes(p)))
    )
  }

  filterByPermission<T>(items: T[], getPerm: (item: T) => string): Observable<T[]> {
    const user = this.getCurrentUser()
    if (user?.isSuperuser) {
      return of(items)
    }

    return this.permissions$.pipe(
      map(permissions => items.filter(item => permissions.includes(getPerm(item))))
    )
  }

  refreshPermissions(): Observable<string[]> {
    this.loaded = false
    const user = this.getCurrentUser()
    if (!user) {
      return of([])
    }
    return this.loadPermissions(user)
  }

  private getCurrentUser(): User | null {
    const userStr = localStorage.getItem('current_user')
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
}
```

---

## Section 10: Config — Menu Config

**ไฟล์:** `src/app/core/config/menu.config.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** สร้าง menu config สำหรับ sidebar

```typescript
export interface MenuItem {
  label: string
  route: string
  icon: string
  permission: string
  children?: MenuItem[]
}

export const MENU_CONFIG: MenuItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard', permission: 'dashboard.view' },
  { label: 'Customers', route: '/customers', icon: 'users', permission: 'customer.view' },
  { label: 'Quotations', route: '/quotations', icon: 'file-text', permission: 'quotation.view' },
  { label: 'Purchase Orders', route: '/purchase-orders', icon: 'shopping-cart', permission: 'purchase_order.view' },
  { label: 'Products', route: '/products', icon: 'package', permission: 'inventory.view' },
  { label: 'Payments', route: '/payments', icon: 'credit-card', permission: 'payment.view' },
  { label: 'Documents', route: '/documents', icon: 'folder', permission: 'document.view' },
  { label: 'Email', route: '/email', icon: 'mail', permission: 'email.view' },
  { label: 'Batch Jobs', route: '/batch/jobs', icon: 'layers', permission: 'batch.view' },
  { label: 'IoT Devices', route: '/iot/devices', icon: 'cpu', permission: 'iot.view' },
  { label: 'Work Orders', route: '/wos/orders', icon: 'clipboard', permission: 'wos.view' },
  { label: 'Job Cards', route: '/jobs', icon: 'briefcase', permission: 'job_card.view' },
  { label: 'Users', route: '/users', icon: 'user', permission: 'user.view' },
  { label: 'Roles', route: '/roles', icon: 'shield', permission: 'role.view' },
]
```

---

## Section 11: Config — Route Permission Map

**ไฟล์:** `src/app/core/config/route-permission.config.ts` (ใหม่)

**From:** ไม่มีไฟล์นี้
**To:** สร้าง route permission map

```typescript
export const ROUTE_PERMISSIONS: Record<string, string> = {
  '/dashboard': 'dashboard.view',
  '/customers': 'customer.view',
  '/customers/create': 'customer.create',
  '/quotations': 'quotation.view',
  '/quotations/create': 'quotation.create',
  '/purchase-orders': 'purchase_order.view',
  '/purchase-orders/create': 'purchase_order.create',
  '/products': 'inventory.view',
  '/products/create': 'inventory.create',
  '/payments': 'payment.view',
  '/documents': 'document.view',
  '/email/templates': 'email.view',
  '/email/compose': 'email.create',
  '/batch/jobs': 'batch.view',
  '/iot/devices': 'iot.view',
  '/wos/orders': 'wos.view',
  '/jobs': 'job_card.view',
  '/users': 'user.view',
  '/users/create': 'user.create',
  '/roles': 'role.view',
  '/roles/create': 'role.create',
}
```

---

## Section 12: Guard — Fix PermissionGuard

**ไฟล์:** `src/app/shared/guards/permission.guard.ts` (แก้ไข)

**From:** `checkPermission()` return `of(true)` เสมอ (stub)
**To:** ใช้ PermissionService.hasPermission() จริง

```typescript
import { Injectable, inject } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { PermissionService } from '../../core/services/permission.service'
import { ROUTE_PERMISSIONS } from '../../core/config/route-permission.config'

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  private permissionService = inject(PermissionService)
  private router = inject(Router)

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermission = route.data['permission'] || ROUTE_PERMISSIONS[route.routeConfig?.path || '']

    if (!requiredPermission) {
      return new BehaviorSubject(true).asObservable()
    }

    return this.permissionService.hasPermission(requiredPermission).pipe(
      take(1),
      map(hasPermission => {
        if (hasPermission) {
          return true
        }
        this.router.navigate(['/dashboard'])
        return false
      })
    )
  }
}
```

---

## Section 13: Routing — Add Permission to All Routes

**ไฟล์:** `src/app/app-routing.module.ts` (แก้ไข)

**From:** มีแค่ `/jobs` ที่มี `data: { permission: 'job_card.view' }`
**To:** ใส่ permission ทุก route

เพิ่ม `data: { permission: '...' }` ให้ทุก route:

```typescript
// ตัวอย่างการแก้ไข
{ path: 'customers', ..., data: { permission: 'customer.view' } }
{ path: 'customers/create', ..., data: { permission: 'customer.create' } }
{ path: 'quotations', ..., data: { permission: 'quotation.view' } }
{ path: 'purchase-orders', ..., data: { permission: 'purchase_order.view' } }
{ path: 'products', ..., data: { permission: 'inventory.view' } }
{ path: 'payments', ..., data: { permission: 'payment.view' } }
{ path: 'documents', ..., data: { permission: 'document.view' } }
{ path: 'email/templates', ..., data: { permission: 'email.view' } }
{ path: 'email/compose', ..., data: { permission: 'email.create' } }
{ path: 'batch/jobs', ..., data: { permission: 'batch.view' } }
{ path: 'iot/devices', ..., data: { permission: 'iot.view' } }
{ path: 'wos/orders', ..., data: { permission: 'wos.view' } }
{ path: 'users', ..., data: { permission: 'user.view' } }
{ path: 'users/create', ..., data: { permission: 'user.create' } }
{ path: 'roles', ..., data: { permission: 'role.view' } }
```

---

## Section 14: Component — Sidebar Permission Filter

**ไฟล์:** `src/app/layouts/sidebar/sidebar.component.ts` (แก้ไข)

**From:** Show menu ทั้งหมดให้ทุก user
**To:** Filter menu ตาม permission

```typescript
// เพิ่มใน sidebar component
ngOnInit() {
  this.permissionService.filterByPermission(MENU_CONFIG, item => item.permission)
    .subscribe(filteredMenu => {
      this.menuItems = filteredMenu
    })
}
```

---

## Section 15-18: Component — Role Management Pages

**ไฟล์:** `src/app/features/auth/presentation/pages/role-list/` (แก้ไข)
**ไฟล์:** `src/app/features/auth/presentation/pages/role-create/` (ใหม่)
**ไฟล์:** `src/app/features/auth/presentation/pages/role-edit/` (ใหม่)
**ไฟล์:** `src/app/features/auth/presentation/pages/role-detail/` (ใหม่)

**From:** RoleListComponent hardcoded 5 roles
**To:** ดึง data จาก API + CRUD pages

### Role List
- ใช้ `ListRolesUseCase` ดึง role list จาก API
- แสดง table: Name, Description, Permissions, Actions (Edit/Delete)
- ปุ่ม "Create Role"

### Role Create
- Form: Name, Description, Permissions (checkbox group)
- ใช้ `CreateRoleUseCase`
- Success → redirect role list

### Role Edit
- Form เหมือน Create แต่ pre-fill data
- ใช้ `UpdateRoleUseCase`
- Success → redirect role list

### Role Detail
- แสดง role info + permissions list
- ปุ่ม Edit, Delete

---

## Section 19: Component — Access Denied Page

**ไฟล์:** `src/app/shared/components/access-denied/` (ใหม่)

**From:** ไม่มีหน้า Access Denied
**To:** สร้างหน้า 403

```typescript
@Component({
  selector: 'app-access-denied',
  template: `
    <div class="access-denied">
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
      <button (click)="goToDashboard()">Go to Dashboard</button>
    </div>
  `
})
export class AccessDeniedComponent {
  private router = inject(Router)

  goToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}
```

---

## Section 20: Component — PermissionCheckbox

**ไฟล์:** `src/app/shared/components/permission-checkbox/` (ใหม่)

**From:** ไม่มี component นี้
**To:** สร้าง PermissionCheckbox component สำหรับเลือก permission ตอน create/edit role

```typescript
@Component({
  selector: 'app-permission-checkbox',
  template: `
    <div class="permission-group">
      <h4>{{ module }}</h4>
      <label *ngFor="let action of actions">
        <input type="checkbox"
               [checked]="isSelected(module + '.' + action)"
               (change)="toggle(module + '.' + action)">
        {{ action }}
      </label>
    </div>
  `
})
export class PermissionCheckboxComponent {
  @Input() module: string = ''
  @Input() actions: string[] = ['view', 'create', 'edit', 'delete', 'approve']
  @Input() selectedPermissions: string[] = []
  @Output() permissionsChange = new EventEmitter<string[]>()

  isSelected(permission: string): boolean {
    return this.selectedPermissions.includes(permission)
  }

  toggle(permission: string) {
    if (this.isSelected(permission)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission)
    } else {
      this.selectedPermissions = [...this.selectedPermissions, permission]
    }
    this.permissionsChange.emit(this.selectedPermissions)
  }
}
```

---

## Section 21-22: DI — Tokens and Providers

**ไฟล์:** `src/app/core/di/tokens.ts` (แก้ไข)
**ไฟล์:** `src/app/core/di/providers.ts` (แก้ไข)

**From:** มี AUTH_REPOSITORY token อยู่แล้ว
**To:** เพิ่ม role use-case providers

```typescript
// tokens.ts — เพิ่ม
export const LIST_ROLES_USE_CASE = new InjectionToken<ListRolesUseCase>('ListRolesUseCase')
export const GET_ROLE_USE_CASE = new InjectionToken<GetRoleUseCase>('GetRoleUseCase')
export const CREATE_ROLE_USE_CASE = new InjectionToken<CreateRoleUseCase>('CreateRoleUseCase')
export const UPDATE_ROLE_USE_CASE = new InjectionToken<UpdateRoleUseCase>('UpdateRoleUseCase')
export const DELETE_ROLE_USE_CASE = new InjectionToken<DeleteRoleUseCase>('DeleteRoleUseCase')
export const ASSIGN_ROLE_PERMISSIONS_USE_CASE = new InjectionToken<AssignRolePermissionsUseCase>('AssignRolePermissionsUseCase')
```

```typescript
// providers.ts — เพิ่ม
{ provide: LIST_ROLES_USE_CASE, useClass: ListRolesUseCase },
{ provide: GET_ROLE_USE_CASE, useClass: GetRoleUseCase },
{ provide: CREATE_ROLE_USE_CASE, useClass: CreateRoleUseCase },
{ provide: UPDATE_ROLE_USE_CASE, useClass: UpdateRoleUseCase },
{ provide: DELETE_ROLE_USE_CASE, useClass: DeleteRoleUseCase },
{ provide: ASSIGN_ROLE_PERMISSIONS_USE_CASE, useClass: AssignRolePermissionsUseCase },
```

---

## Section 23: Unit Tests — PermissionService

**ไฟล์:** `src/app/core/services/permission.service.spec.ts` (ใหม่)

**Test cases:**
- should load permissions from API
- should fallback to User permissions when API fails
- should fallback to empty array when no data
- should return true for isSuperuser on any permission
- should check permission correctly
- should check hasAnyPermission correctly
- should filter items by permission
- should refresh permissions

---

## Section 24: Unit Tests — PermissionGuard

**ไฟล์:** `src/app/shared/guards/permission.guard.spec.ts` (ใหม่)

**Test cases:**
- should allow access when user has required permission
- should deny access when user lacks permission
- should allow access for superuser regardless of permission
- should redirect to /dashboard when denied
- should allow access when no permission required in route data

---

## Section 25: Unit Tests — Role Use Cases

**ไฟล์:** `src/app/features/auth/domain/use-cases/*.spec.ts` (ใหม่)

**Test cases:**
- ListRolesUseCase: should return role list from repository
- GetRoleUseCase: should return role by id
- CreateRoleUseCase: should create role with permissions
- UpdateRoleUseCase: should update role
- DeleteRoleUseCase: should delete role
- AssignRolePermissionsUseCase: should assign permissions to role

---

## Unit Tests

**เขียน** — unit tests สำหรับทุก section ที่แก้ไข

### Test Coverage

| Section | Test File | Cases |
|---------|-----------|-------|
| PermissionService | `permission.service.spec.ts` | 8 cases |
| PermissionGuard | `permission.guard.spec.ts` | 5 cases |
| ListRolesUseCase | `list-roles.use-case.spec.ts` | 2 cases |
| GetRoleUseCase | `get-role.use-case.spec.ts` | 2 cases |
| CreateRoleUseCase | `create-role.use-case.spec.ts` | 2 cases |
| UpdateRoleUseCase | `update-role.use-case.spec.ts` | 2 cases |
| DeleteRoleUseCase | `delete-role.use-case.spec.ts` | 2 cases |
| AssignRolePermissionsUseCase | `assign-role-permissions.use-case.spec.ts` | 2 cases |

### Mock Strategy

- Mock `IAuthRepository` สำหรับทุก test
- ใช้ `BehaviorSubject` สำหรับ permission stream
- ใช้ `localStorage` mock สำหรับ user data

---

## Execution Order

1. Model Layer (Section 1-4) — Role Entity, Permission Type, DTOs
2. Repository Interface (Section 5) — เพิ่ม role methods
3. Datasource (Section 6) — เพิ่ม API calls
4. Repository Implementation (Section 7) — implement role CRUD
5. Use Cases (Section 8) — เพิ่ม 6 role use-cases
6. PermissionService (Section 9) — สร้าง central service
7. Config Files (Section 10-11) — menu config, route permission map
8. PermissionGuard (Section 12) — fix stub
9. Routing (Section 13) — ใส่ permission ทุก route
10. Sidebar Component (Section 14) — filter menu
11. Role Management Pages (Section 15-18) — CRUD pages
12. Access Denied + PermissionCheckbox (Section 19-20) — UI components
13. DI Tokens & Providers (Section 21-22) — wiring
14. Unit Tests (Section 23-25) — ทดสอบทุกอย่าง
