# Permission Access by Role — Design Document

## Status: Draft (Sections 1-3 approved)

---

## Overview

ระบบ Role-Based Access Control (RBAC) สำหรับ Angular Clean Architecture project
ใช้ Centralized Permission Service approach — service ตัวเดียวทำทุกอย่าง

---

## Requirements (ตกลงแล้ว)

1. CRUD roles + assign permission ผ่าน backend API
2. Frontend รับ permission string จาก backend, ไม่ hardcoded modules
3. ซ่อน menu item ตาม permission
4. Backend ส่ง menu structure → fallback frontend config
5. Fix PermissionGuard + ใส่ permission ทุก route + check จริง
6. Permission: API → User entity → hardcoded fallback
7. isSuperuser bypass ทุก permission

---

## Approach: Centralized Permission Service (Approach A)

สร้าง `PermissionService` ตัวเดียว ทำทุกอย่าง:
- Call API `/auth/permissions` ตอน login, cache ใน service
- Fallback: ดึงจาก User entity → hardcoded
- Export `hasPermission(perm)` method ให้ guard, sidebar, component ใช้
- isSuperuser check อยู่ใน service เดียวกัน

**Decision A: CRUD เฉพาะ permission (ข้อ 2)**
- 5 roles เดิม (admin, manager, staff, technician, customer) ยังใช้ได้ดี
- ไม่ต้อง build หน้า create/edit/delete role — ซับซ้อน
- แค่ config ว่าแต่ละ role มี permission อะไรบ้าง ผ่าน API

**Decision B: Frontend only menu (ข้อ 2)**
- Menu config อยู่ใน frontend file เดียว — ดูง่าย, แก้ง่าย
- ไม่ต้อง call API menu — เร็ว, ไม่ dependency backend

**Decision C: Check permission ตอน login (ข้อ 1)**
- Call API permission ครั้งเดียวตอน login
- Cache ไว้ใน PermissionService — เร็ว
- ไม่ต้อง refresh ซ้ำ ๆ — ไม่หนัก

---

## Section 1: PermissionService Core

### New/Modified Files

```
src/app/features/auth/domain/
  entities/
    permission.entity.ts     (มีอยู่แล้ว — เพิ่ม PermissionAction type)
    role.entity.ts           (ใหม่ — Role interface)
  repositories/
    auth.repository.ts       (เพิ่ม role CRUD methods)
  use-cases/
    ...use-cases ที่มีอยู่ + เพิ่ม role use-cases

src/app/features/auth/data/
  dtos/
    role.dto.ts              (ใหม่ — Role DTO)
    permission.dto.ts        (ใหม่ — Permission DTO)
  datasources/
    auth.api.datasource.ts   (เพิ่ม role CRUD API calls)
  repositories/
    auth.repository.impl.ts  (implement role CRUD)

src/app/core/services/
  permission.service.ts      (ใหม่ — central service)
```

### PermissionService Interface

```typescript
@Injectable({ providedIn: 'root' })
export class PermissionService {
  // ตอน login — call API, cache result
  loadPermissions(): Observable<string[]>

  // check permission — ถ้า isSuperuser return true เลย
  hasPermission(permission: string): Observable<boolean>

  // check หลาย permission พร้อมกัน
  hasAnyPermission(permissions: string[]): Observable<boolean>

  // สำหรับ menu filter
  filterByPermission<T>(items: T[], getPerm: (item: T) => string): Observable<T[]>

  // refresh permission (ตอน user ถูก update role)
  refreshPermissions(): Observable<string[]>
}
```

### Permission Fallback Chain

1. Call `GET /auth/permissions` → cache ได้
2. ถ้า API fail → ดึงจาก `User.permissions` (login response)
3. ถ้า User ไม่มี permissions field → hardcoded fallback (empty = ไม่มี permission)
4. `isSuperuser === true` → bypass ทุก check

---

## Section 2: Role CRUD + Menu Structure

### Role Entity

```typescript
export interface Role {
  id: number
  name: string
  description: string
  permissions: string[]  // e.g. ['customer.view', 'customer.create', 'payment.approve']
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Role CRUD Use Cases (新增)

- `list-roles.use-case.ts` — ดึง role list ทั้งหมด
- `get-role.use-case.ts` — ดึง role by id
- `create-role.use-case.ts` — สร้าง role ใหม่ + assign permission
- `update-role.use-case.ts` — แก้ role + permission
- `delete-role.use-case.ts` — ลบ role
- `assign-role-permissions.use-case.ts` — assign permission list ให้ role

### API Endpoints

```
GET    /roles           — list roles
GET    /roles/:id       — get role
POST   /roles           — create role
PATCH  /roles/:id       — update role
DELETE /roles/:id       — delete role
PATCH  /roles/:id/permissions — assign permissions
```

### Menu Structure — Frontend Only (Decision B)

Menu config อยู่ใน `menu.config.ts`:

```typescript
export interface MenuItem {
  label: string
  route: string
  icon: string
  permission: string     // e.g. 'customer.view'
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
  { label: 'Job Cards', route: '/jobs', icon: 'briefcase', permission: 'job_card.view' },
  { label: 'Users', route: '/users', icon: 'user', permission: 'user.view' },
  { label: 'Roles', route: '/roles', icon: 'shield', permission: 'role.view' },
]
```

Sidebar component ใช้ `PermissionService.filterByPermission()` ซ่อน item ที่ไม่มี permission

---

## Section 3: PermissionGuard + Route Protection

### Fix PermissionGuard

- ตอนนี้ `checkPermission()` return `of(true)` เสมอ (stub)
- แก้ให้ใช้ `PermissionService.hasPermission(perm)` จริง
- ถ้า isSuperuser → bypass (PermissionService handle อยู่แล้ว)
- ถ้าไม่มี permission → redirect ไป `/dashboard`

### Route Permission Map

สร้าง `route-permission.config.ts` — map แต่ละ route กับ permission:

```typescript
export const ROUTE_PERMISSIONS: Record<string, string> = {
  '/dashboard': 'dashboard.view',
  '/customers': 'customer.view',
  '/customers/create': 'customer.create',
  '/customers/:id/edit': 'customer.edit',
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
}
```

### Flow

```
User navigate → /customers
  → PermissionGuard activate
  → PermissionService.hasPermission('customer.view')
  → isSuperuser? → allow
  → has permission? → allow
  → no permission? → redirect /dashboard
```

---

## Remaining Sections (pending)

- Section 4: UI Components (Role Management pages)
- Section 5: Error Handling & Edge Cases
- Section 6: Testing Strategy

---

## Key Files to Create/Modify

| File | Action |
|------|--------|
| `src/app/core/services/permission.service.ts` | Create |
| `src/app/features/auth/domain/entities/role.entity.ts` | Create |
| `src/app/features/auth/data/dtos/role.dto.ts` | Create |
| `src/app/features/auth/data/dtos/permission.dto.ts` | Create |
| `src/app/core/config/menu.config.ts` | Create |
| `src/app/core/config/route-permission.config.ts` | Create |
| `src/app/shared/guards/permission.guard.ts` | Modify |
| `src/app/features/auth/domain/repositories/auth.repository.ts` | Modify |
| `src/app/features/auth/data/datasources/auth.api.datasource.ts` | Modify |
| `src/app/features/auth/data/repositories/auth.repository.impl.ts` | Modify |
| `src/app/layouts/sidebar/sidebar.component.ts` | Modify |
| `src/app/app-routing.module.ts` | Modify |
