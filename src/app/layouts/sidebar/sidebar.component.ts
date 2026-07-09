import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  badge?: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() transparent = false;
  @Input() end = false;
  @Input() background = '';
  @Input() dark = false;

  private router = inject(Router);

  isActiveRoute(route: string | undefined): boolean {
    return route ? this.router.isActive(route, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' }) : false;
  }

  isChildActive(children: MenuItem[] | undefined): boolean {
    if (!children) {return false;}
    return children.some(c => this.isActiveRoute(c.route) || this.isChildActive(c.children));
  }

  menuItems: MenuItem[] = [
    { label: 'nav.dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'nav.jobs', icon: 'clipboard', route: '/jobs',
      children: [
        { label: 'nav.jobList', icon: 'list', route: '/jobs' },
        { label: 'nav.jobBoard', icon: 'layout-kanban', route: '/jobs/board' },
        { label: 'nav.jobCreate', icon: 'plus', route: '/jobs/create' },
      ],
    },
    {
      label: 'nav.customers', icon: 'users', route: '/customers',
      children: [
        { label: 'nav.customerList', icon: 'list', route: '/customers' },
        { label: 'nav.customerCreate', icon: 'plus', route: '/customers/create' },
      ],
    },
    { label: 'nav.quotations', icon: 'file-text', route: '/quotations' },
    { label: 'nav.purchaseOrders', icon: 'shopping-cart', route: '/purchase-orders' },
    { label: 'nav.products', icon: 'package', route: '/products' },
    { label: 'nav.payments', icon: 'credit-card', route: '/payments' },
    { label: 'nav.invoices', icon: 'report', route: '/invoices' },
    { label: 'nav.documents', icon: 'folder', route: '/documents' },
    {
      label: 'nav.email', icon: 'mail', route: '/email/templates',
      children: [
        { label: 'nav.emailTemplates', icon: 'file-text', route: '/email/templates' },
        { label: 'nav.emailCompose', icon: 'send', route: '/email/compose' },
        { label: 'nav.emailLogs', icon: 'list-check', route: '/email/logs' },
      ],
    },
    { label: 'nav.batchJobs', icon: 'clock', route: '/batch/jobs' },
    { label: 'nav.iot', icon: 'device-desktop', route: '/iot/devices' },
    { label: 'nav.wos', icon: 'shopping-bag', route: '/wos/orders' },
    { label: 'nav.reports', icon: 'chart-bar', route: '/reports' },
    
    {
      label: 'nav.system', icon: 'settings', route: '/users',
      children: [
        { label: 'nav.users', icon: 'user-circle', route: '/users' },
        { label: 'nav.roles', icon: 'shield', route: '/roles' },
        { label: 'nav.language', icon: 'language', route: '/settings/language' },
        { label: 'nav.themeSettings', icon: 'palette', route: '/settings/theme' },
      ],
    },
  ];

  expandedMenus: Set<string> = new Set();

  toggleSubmenu(label: string): void {
    if (this.expandedMenus.has(label)) {
      this.expandedMenus.delete(label);
    } else {
      this.expandedMenus.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }
}