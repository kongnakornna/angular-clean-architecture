import { Component, inject } from '@angular/core';

import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private layout = inject(LayoutService);

  unreadCount = 3;

  get username(): string {
    return localStorage.getItem('username') || 'User';
  }

  notifications = [
    { id: 1, title: 'งานใหม่ถูกสร้าง', time: '5 นาทีที่แล้ว', read: false },
    { id: 2, title: 'Quotation ถูกอนุมัติ', time: '1 ชั่วโมงที่แล้ว', read: false },
    { id: 3, title: 'สต็อกสินค้าต่ำ', time: '2 ชั่วโมงที่แล้ว', read: true },
  ];

  profileMenu = [
    { label: 'Profile', icon: 'user', route: '/profile' },
    { label: 'Analytics', icon: 'chart-pie', route: '/analytics' },
    { divider: true },
    { label: 'Settings & Privacy', route: '/settings' },
    { label: 'Help' },
    { label: 'Sign out', action: 'logout' },
  ];

  apps = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { label: 'Customers', icon: 'users', route: '/customers' },
    { label: 'Quotations', icon: 'file-text', route: '/quotations' },
    { label: 'Purchase Orders', icon: 'shopping-cart', route: '/purchase-orders' },
    { label: 'Products', icon: 'package', route: '/products' },
    { label: 'Payments', icon: 'credit-card', route: '/payments' },
    { label: 'Documents', icon: 'folder', route: '/documents' },
    { label: 'Job Cards', icon: 'briefcase', route: '/jobs' },
    { label: 'Work Orders', icon: 'clipboard', route: '/wos/orders' },
    { label: 'Batch Jobs', icon: 'layers', route: '/batch/jobs' },
    { label: 'IoT Devices', icon: 'cpu', route: '/iot/devices' },
    { label: 'Analytics', icon: 'chart-line', route: '/analytics' },
    { label: 'Reports', icon: 'scoreboard', route: '/reports' },
    { label: 'Email', icon: 'mail', route: '/email/templates' },
    { label: 'Languages', icon: 'globe', route: '/i18n/languages' },
    { label: 'Users', icon: 'user', route: '/users' },
  ];

  horizontalMenu = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { label: 'IoT Devices', icon: 'package', route: '/iot/devices' },
    { label: 'Documents', icon: 'folder', route: '/documents' },
    {
      label: 'Customers', icon: 'users', route: '/customers',
      children: [
        { label: 'Users', icon: 'user', route: '/users' },
        { label: 'Roles', icon: 'shield', route: '/roles' },
        { label: 'Customer List', icon: 'list', route: '/customers' },
        { label: 'Customer Create', icon: 'plus', route: '/customers/create' },
      ],
    },
    {
      label: 'Service', icon: 'list', route: '/payments',
      children: [
        { label: 'Payments', icon: 'credit-card', route: '/payments' },
        { label: 'Invoices', icon: 'receipt', route: '/invoices' },
        { label: 'Job Cards', icon: 'briefcase', route: '/jobs' },
        { label: 'Work Orders', icon: 'clipboard', route: '/wos/orders' },
        { label: 'Batch Jobs', icon: 'layers', route: '/batch/jobs' },
        { label: 'Analytics', icon: 'chart-line', route: '/analytics' },
        { label: 'Reports', icon: 'scoreboard', route: '/reports' },
        { label: 'Languages', icon: 'globe', route: '/i18n/languages' },
        { label: 'Quotations', icon: 'file-text', route: '/quotations' },
        { label: 'Purchase Orders', icon: 'shopping-cart', route: '/purchase-orders' },
        { label: 'Products', icon: 'package', route: '/products' },
        { label: 'Email Templates', icon: 'mail', route: '/email/templates' },
        { label: 'Email Compose', icon: 'pencil', route: '/email/compose' },
        { label: 'Email Logs', icon: 'history', route: '/email/logs' },
      ],
    },
    {
      label: 'Settings', icon: 'settings', route: '/settings/theme',
      children: [
        { label: 'Theme', icon: 'palette', route: '/settings/theme' },
        { label: 'Language', icon: 'language', route: '/settings/language' },
      ],
    },
  ];

  get isDarkMode(): boolean {
    return this.layout.theme() === 'dark';
  }

  get layoutMode(): string {
    return this.layout.layout();
  }

  toggleTheme(): void {
    this.layout.update('theme', this.isDarkMode ? 'light' : 'dark');
  }

  setLayout(mode: 'fluid' | 'boxed' | 'boxed-2'): void {
    this.layout.update('layout', mode);
  }

  openFullscreen(): void {
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => void;
      msRequestFullscreen?: () => void;
      mozRequestFullScreen?: () => void;
    };

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    }
  }

  logout(): void {
    const themeKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tabler-')) {
        themeKeys.push(key);
      }
    }
    const themeValues: Record<string, string> = {};
    themeKeys.forEach((k) => {
      themeValues[k] = localStorage.getItem(k) || '';
    });

    localStorage.clear();

    Object.entries(themeValues).forEach(([k, v]) => localStorage.setItem(k, v));

    window.location.href = '/login';
  }
}
