import { Routes } from '@angular/router';

export const TABLER_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardPageComponent),
  },
  {
    path: 'blank',
    loadComponent: () => import('./pages/blank/blank.component').then(m => m.BlankPageComponent),
  },
];
