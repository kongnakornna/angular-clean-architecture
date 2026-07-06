import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/presentation/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/presentation/pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/presentation/pages/main-dashboard/main-dashboard.component'
          ).then((m) => m.MainDashboardComponent),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./features/job-card/job-card.module').then((m) => m.JobCardModule),
        canActivate: [PermissionGuard],
        data: { permission: 'job_card.view' },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './features/customer/presentation/pages/customer-list/customer-list.component'
          ).then((m) => m.CustomerListComponent),
      },
      {
        path: 'quotations',
        loadComponent: () =>
          import(
            './features/quotation/presentation/pages/quotation-list/quotation-list.component'
          ).then((m) => m.QuotationListComponent),
      },
      {
        path: 'purchase-orders',
        loadComponent: () =>
          import(
            './features/purchase-order/presentation/pages/po-list/po-list.component'
          ).then((m) => m.POListComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import(
            './features/inventory/presentation/pages/product-list/product-list.component'
          ).then((m) => m.ProductListComponent),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import(
            './features/payment/presentation/pages/payment-list/payment-list.component'
          ).then((m) => m.PaymentListComponent),
      },
      {
        path: 'documents',
        loadComponent: () =>
          import(
            './features/document/presentation/pages/document-list/document-list.component'
          ).then((m) => m.DocumentListComponent),
      },
      {
        path: 'email/templates',
        loadComponent: () =>
          import(
            './features/email/presentation/pages/email-templates/email-templates.component'
          ).then((m) => m.EmailTemplatesComponent),
      },
      {
        path: 'batch/jobs',
        loadComponent: () =>
          import('./features/batch/presentation/pages/batch-list/batch-list.component').then(
            (m) => m.BatchListComponent
          ),
      },
      {
        path: 'iot/devices',
        loadComponent: () =>
          import('./features/iot/presentation/pages/device-list/device-list.component').then(
            (m) => m.DeviceListComponent
          ),
      },
      {
        path: 'wos/orders',
        loadComponent: () =>
          import('./features/wos/presentation/pages/order-list/order-list.component').then(
            (m) => m.OrderListComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
