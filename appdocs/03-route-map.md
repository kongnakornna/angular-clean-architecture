# iCmon — Developer Manual

## 03 — Route Map

### Route Table

| URL | Component / Module | Guard | Layout |
|-----|-------------------|-------|--------|
| `/` | Redirect → `/dashboard` | — | — |
| `/tabler` | `TablerModule` (demo pages) | — | Tabler layout |
| `/login` | `LoginComponent` | — | AuthLayout |
| `/forgot-password` | `ForgotPasswordComponent` | — | AuthLayout |
| `/sign-up` | `SignUpComponent` | — | AuthLayout |
| `/lock-screen` | `LockScreenComponent` | — | AuthLayout |
| `/two-step-verification` | `TwoStepVerificationComponent` | — | AuthLayout |
| `/two-step-code` | `TwoStepCodeComponent` | — | AuthLayout |
| `/reset-password` | `ResetPasswordComponent` | — | AuthLayout |
| `/dashboard` | `MainDashboardComponent` | AuthGuard | AppLayout |
| `/jobs` | `JobCardModule` ⤵ | AuthGuard + PermissionGuard | AppLayout |
| `/jobs/board` | `JobCardModule` ⤵ | — | AppLayout |
| `/jobs/create` | `JobCardModule` ⤵ | — | AppLayout |
| `/jobs/:id` | `JobCardModule` ⤵ | — | AppLayout |
| `/jobs/edit/:id` | `JobCardModule` ⤵ | — | AppLayout |
| `/customers` | `CustomerListComponent` | AuthGuard | AppLayout |
| `/quotations` | `QuotationListComponent` | AuthGuard | AppLayout |
| `/purchase-orders` | `POListComponent` | AuthGuard | AppLayout |
| `/products` | `ProductListComponent` | AuthGuard | AppLayout |
| `/payments` | `PaymentListComponent` | AuthGuard | AppLayout |
| `/documents` | `DocumentListComponent` | AuthGuard | AppLayout |
| `/email/templates` | `EmailTemplatesComponent` | AuthGuard | AppLayout |
| `/email/compose` | `EmailComposeComponent` | AuthGuard | AppLayout |
| `/email/logs` | `EmailLogsComponent` | AuthGuard | AppLayout |
| `/batch/jobs` | `BatchListComponent` | AuthGuard | AppLayout |
| `/iot/devices` | `DeviceListComponent` | AuthGuard | AppLayout |
| `/wos/orders` | `OrderListComponent` | AuthGuard | AppLayout |
| `/reports` | `ReportsComponent` | AuthGuard | AppLayout |
| `/analytics` | `AnalyticsComponent` | AuthGuard | AppLayout |
| `/invoices` | `InvoiceViewComponent` | AuthGuard | AppLayout |
| `/i18n/languages` | `LanguageSelectorComponent` | AuthGuard | AppLayout |
| `/settings/theme` | `ThemeSettingsComponent` | AuthGuard | AppLayout |
| `/settings/language` | `LanguageSelectorComponent` | AuthGuard | AppLayout |
| `/users` | `UserListComponent` | AuthGuard | AppLayout |
| `/users/create` | `UserCreateComponent` | AuthGuard | AppLayout |
| `/roles` | `RoleListComponent` | AuthGuard | AppLayout |

### Guards

**AuthGuard** (`src/app/shared/guards/auth.guard.ts`)
- Checks `access_token` in localStorage
- Returns `true` if token exists
- Redirects to `/login` if missing

**PermissionGuard** (`src/app/shared/guards/permission.guard.ts`)
- Reads `route.data['permission']`
- Currently returns `of(true)` (TODO — not connected to backend)
- Redirects to `/dashboard` if unauthorized

### Route Configuration Source

Defined in `src/app/app-routing.module.ts:8-238`

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Auth routes → AuthLayout
  { path: '', component: AuthLayoutComponent, children: [...] },
  // App routes → AppLayout (with AuthGuard)
  { path: '', component: AppLayoutComponent, canActivate: [AuthGuard], children: [...] },
];

RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
```

### Loading Strategy

All content pages use **lazy loading** via `loadComponent()` (standalone) or `loadChildren()` (modules). Only auth pages and tabler demo pages use dedicated layouts — everything else uses `AppLayoutComponent`.

### Guards Reference

```
AuthGuard       →  src/app/shared/guards/auth.guard.ts
PermissionGuard →  src/app/shared/guards/permission.guard.ts
```