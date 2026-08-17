import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { LayoutService } from '../../core/services/layout.service';

interface MenuItem {
  label?: string;
  icon?: string;
  route?: string;
  action?: string;
  divider?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private layout = inject(LayoutService);
  private sanitizer = inject(DomSanitizer);

  private invoiceIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-book"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>`;

  unreadCount = 3;

  trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  isSvgIcon(icon?: string): boolean {
    return !!icon && icon.startsWith('<svg');
  }

  getIconName(icon?: string): string {
    return icon?.startsWith('<svg') ? '' : (icon || '');
  }

  get username(): string {
    return localStorage.getItem('username') || 'User';
  }

  notifications = [
    { id: 1, title: 'งานใหม่ถูกสร้าง', time: '5 นาทีที่แล้ว', read: false },
    { id: 2, title: 'Quotation ถูกอนุมัติ', time: '1 ชั่วโมงที่แล้ว', read: false },
    { id: 3, title: 'สต็อกสินค้าต่ำ', time: '2 ชั่วโมงที่แล้ว', read: true },
  ];

  profileMenu: MenuItem[] = [
    { label: 'Profile', icon: 'user', route: '/profile' },
    { label: 'Analytics', icon: 'chart-pie', route: '/analytics' },
    { divider: true },
    { label: 'Settings & Privacy', route: '/settings' },
    { label: 'Help' },
    { label: 'Lock Screen', route: 'lock-screen' },
    { label: 'Sign out', action: 'logout' },
  ];


  apps: MenuItem[] = [
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

  horizontalMenu: MenuItem[] = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'Customers', icon: 'users', route: '/customers',
      children: [
        { label: 'Customer List', icon: 'list', route: '/customers' },
        { label: 'Customer Create', icon: 'plus', route: '/customers/create' },
      ],
    },
    {
      label: 'Service', icon: 'list', route: '/payments',
      children: [
        { label: 'Payments', icon: 'credit-card', route: '/payments' },
        { label: 'Invoices', icon: this.invoiceIcon, route: '/invoices' },
        { label: 'Job Cards', icon: 'clipboard', route: '/jobs' },
        { label: 'Work Orders', icon: 'clipboard', route: '/wos/orders' },
        { label: 'Batch Jobs', icon: 'clipboard', route: '/batch/jobs' },
        { label: 'Analytics', icon: 'clipboard', route: '/analytics' },
        { label: 'Reports', icon: 'clipboard', route: '/reports' },
        { label: 'Quotations', icon: 'file-text', route: '/quotations' },
        { label: 'Purchase Orders', icon: 'shopping-cart', route: '/purchase-orders' },
        { label: 'Products', icon: 'package', route: '/products' },
        { label: 'Email Templates', icon: 'clipboard', route: '/email/templates' },
        { label: 'Email Compose', icon: 'pencil', route: '/email/compose' },
        { label: 'Email Logs', icon: 'clipboard', route: '/email/logs' },
        { label: 'Languages', icon: 'globe', route: '/i18n/languages' },
      ],
    },
    {
      label: 'Settings', icon: 'settings', route: '/settings/theme',
      children: [
        { label: 'Theme', icon: 'palette', route: '/settings/theme' },
        { label: 'Language', icon: 'language', route: '/settings/language' },
        { label: 'Users', icon: 'user', route: '/users' },
        { label: 'Roles', icon: 'shield', route: '/roles' },
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
