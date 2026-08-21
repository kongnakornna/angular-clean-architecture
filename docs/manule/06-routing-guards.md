# 06 — Routing & Guards

ทุก route อยู่ในไฟล์เดียว: `src/app/app-routing.module.ts`

## โครงสร้าง Route หลัก

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // กลุ่ม 1: Auth pages → AuthLayoutComponent (ไม่มี guard)
  { path: '', component: AuthLayoutComponent, children: [ /* login, sign-up, ... */ ] },

  // กลุ่ม 2: App pages → AppLayoutComponent + AuthGuard
  { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children: [ /* ... */ ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
})
export class AppRoutingModule {}
```

## Route Table

### Auth (AuthLayout — ไม่ต้อง login)

| URL | Component |
|-----|-----------|
| `/login` | `LoginComponent` |
| `/forgot-password` | `ForgotPasswordComponent` |
| `/sign-up` | `SignUpComponent` |
| `/lock-screen` | `LockScreenComponent` |
| `/two-step-verification` | `TwoStepVerificationComponent` |
| `/two-step-code` | `TwoStepCodeComponent` |
| `/reset-password` | `ResetPasswordComponent` |

### App Pages (AppLayout + AuthGuard)

| URL | Component / Module | PermissionGuard | permission |
|-----|--------------------|-----------------|------------|
| `/dashboard` | `MainDashboardComponent` | — | — |
| `/jobs` (+ board/create/:id/edit) | `JobCardModule` (loadChildren) | ✅ | `job_card.view` |
| `/customers` | `CustomerListComponent` | ✅ | `customer.view` |
| `/customers/create` | `CustomerCreateComponent` | ✅ | `customer.create` |
| `/quotations` | `QuotationListComponent` | ✅ | `quotation.view` |
| `/purchase-orders` | `POListComponent` | ✅ | `purchase_order.view` |
| `/products` | `ProductListComponent` | ✅ | `inventory.view` |
| `/payments` | `PaymentListComponent` | ✅ | `payment.view` |
| `/invoices` | `InvoiceViewComponent` | — | — |
| `/documents` | `DocumentListComponent` | ✅ | `document.view` |
| `/email/templates` | `EmailTemplatesComponent` | ✅ | `email.view` |
| `/email/compose` | `EmailComposeComponent` | ✅ | `email.create` |
| `/email/logs` | `EmailLogsComponent` | — | — |
| `/batch/jobs` | `BatchListComponent` | ✅ | `batch.view` |
| `/iot/devices` | `DeviceListComponent` | ✅ | `iot.view` |
| `/iot/settings` | `IoTSettingsComponent` | ✅ | `iot.view` |
| `/iot/reports` | `IoTReportsComponent` | ✅ | `iot.view` |
| `/mqtt/dashboard` | `MqttDashboardComponent` | ✅ | `iot.view` |
| `/mqtt/flows` | `MqttFlowEditorComponent` | ✅ | `iot.view` |
| `/wos/orders` | `OrderListComponent` | ✅ | `wos.view` |
| `/analytics` | `AnalyticsComponent` | — | — |
| `/reports` | `ReportsComponent` + ReportRoutes (loadChildren) | ✅ (routes) | `report.view` |
| `/i18n/languages` | `LanguageSelectorComponent` | — | — |
| `/settings/theme` | `ThemeSettingsComponent` | — | — |
| `/settings/language` | `LanguageSelectorComponent` | — | — |
| `/settings` | SettingsRoutes (loadChildren) | ✅ | `settings.view` |
| `/users` | `UserListComponent` | ✅ | `user.view` |
| `/users/create` | `UserCreateComponent` | ✅ | `user.create` |
| `/users/:id/edit` | `UserEditComponent` | — | — |
| `/roles` | `RoleListComponent` | ✅ | `role.view` |
| `/ai-analytics` | AI_ANALYTICS_ROUTES (loadChildren) | ✅ | `ai_analytics.view` |
| `/monitoring` | MONITORING_ROUTES (loadChildren) | ✅ | `monitoring.view` |

## Lazy Loading Strategy

- **Standalone page** → ใช้ `loadComponent()`:

```typescript
{
  path: 'customers',
  loadComponent: () =>
    import('./features/customer/presentation/pages/customer-list/customer-list.component')
      .then((m) => m.CustomerListComponent),
}
```

- **Module ที่มี sub-routes** → ใช้ `loadChildren()`:

```typescript
{
  path: 'jobs',
  loadChildren: () => import('./features/job-card/job-card.module').then((m) => m.JobCardModule),
}
```

- **Feature ยุคใหม่** (ai-analytics, monitoring, settings, report) → routes แยกไฟล์
  เช่น `features/monitoring/monitoring.routes.ts` export `MONITORING_ROUTES`

## Guards

### AuthGuard (`src/app/shared/guards/auth.guard.ts`)

- เช็คว่ามี `access_token` ใน localStorage
- ไม่มี → redirect ไป `/login`
- ผูกที่ route group ของ AppLayout ทั้งก้อน

### PermissionGuard (`src/app/shared/guards/permission.guard.ts`)

- อ่าน `route.data['permission']` เช่น `{ data: { permission: 'job_card.view' } }`
- เช็คสิทธิ์ของ user ปัจจุบัน → ไม่ผ่าน redirect `/dashboard`
- ⚠️ TODO: การเช็คจริงยังต้องเชื่อม backend

## เพิ่ม Route ใหม่

1. เพิ่ม object ใน `children` ของ AppLayout group ใน `app-routing.module.ts`
2. ใช้ `loadComponent` (standalone page) หรือ `loadChildren` (module/routes)
3. ถ้าต้องการคุมสิทธิ์ → ใส่ `canActivate: [PermissionGuard]` + `data: { permission: 'xxx.yyy' }`
4. เพิ่ม menu item ใน `layouts/sidebar/sidebar.component.ts`
