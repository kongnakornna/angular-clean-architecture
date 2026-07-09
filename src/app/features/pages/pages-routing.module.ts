import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'blank', loadComponent: () => import('./presentation/blank/blank.component').then(m => m.BlankComponent) },
      { path: 'buttons', loadComponent: () => import('./presentation/buttons/buttons.component').then(m => m.ButtonsComponent) },
      { path: 'cards', loadComponent: () => import('./presentation/cards/cards.component').then(m => m.CardsComponent) },
      { path: 'modals', loadComponent: () => import('./presentation/modals/modals.component').then(m => m.ModalsComponent) },
      { path: 'tables', loadComponent: () => import('./presentation/tables/tables.component').then(m => m.TablesComponent) },
      { path: 'charts', loadComponent: () => import('./presentation/charts/charts.component').then(m => m.ChartsComponent) },
      { path: 'alerts', loadComponent: () => import('./presentation/alerts/alerts.component').then(m => m.AlertsComponent) },
      { path: 'form-elements', loadComponent: () => import('./presentation/form-elements/form-elements.component').then(m => m.FormElementsComponent) },
      { path: 'typography', loadComponent: () => import('./presentation/typography/typography.component').then(m => m.TypographyComponent) },
      { path: 'icons', loadComponent: () => import('./presentation/icons/icons.component').then(m => m.IconsComponent) },
      { path: 'profile', loadComponent: () => import('./presentation/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'invoice', loadComponent: () => import('./presentation/invoice/invoice.component').then(m => m.InvoiceComponent) },
      { path: 'settings', loadComponent: () => import('./presentation/settings/settings.component').then(m => m.SettingsComponent) },
      { path: 'users', loadComponent: () => import('./presentation/users/users.component').then(m => m.UsersComponent) },
      { path: 'email-inbox', loadComponent: () => import('./presentation/email-inbox/email-inbox.component').then(m => m.EmailInboxComponent) },
      { path: 'activity', loadComponent: () => import('./presentation/activity/activity.component').then(m => m.ActivityComponent) },
      { path: 'gallery', loadComponent: () => import('./presentation/gallery/gallery.component').then(m => m.GalleryComponent) },
      { path: 'pricing', loadComponent: () => import('./presentation/pricing/pricing.component').then(m => m.PricingComponent) },
      { path: 'faq', loadComponent: () => import('./presentation/faq/faq.component').then(m => m.FaqComponent) },
      { path: 'empty', loadComponent: () => import('./presentation/empty/empty.component').then(m => m.EmptyComponent) },
      { path: 'search-results', loadComponent: () => import('./presentation/search-results/search-results.component').then(m => m.SearchResultsComponent) },
      { path: 'chat', loadComponent: () => import('./presentation/chat/chat.component').then(m => m.ChatComponent) },
      { path: 'logs', loadComponent: () => import('./presentation/logs/logs.component').then(m => m.LogsComponent) },
      { path: 'maps', loadComponent: () => import('./presentation/maps/maps.component').then(m => m.MapsComponent) },
      { path: 'tasks', loadComponent: () => import('./presentation/tasks/tasks.component').then(m => m.TasksComponent) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}