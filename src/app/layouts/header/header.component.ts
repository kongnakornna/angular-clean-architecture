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
    { label: 'Jobs', icon: 'clipboard', route: '/jobs' },
    { label: 'Customers', icon: 'users', route: '/customers' },
    { label: 'IoT', icon: 'device-desktop', route: '/iot/devices' },
    { label: 'Reports', icon: 'scoreboard', route: '/reports' },
    { label: 'Analytics', icon: 'chart-line', route: '/analytics' },
  ];

  horizontalMenu = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'Jobs', icon: 'clipboard', route: '/jobs',
      children: [
        { label: 'Job List', icon: 'list', route: '/jobs' },
        { label: 'Job Board', icon: 'layout-kanban', route: '/jobs/board' },
      ],
    },
    {
      label: 'Customers', icon: 'users', route: '/customers',
      children: [
        { label: 'Customer List', icon: 'list', route: '/customers' },
        { label: 'Customer Create', icon: 'plus', route: '/customers/create' },
      ],
    },
    { label: 'Reports', icon: 'clipboard', route: '/reports' },
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
