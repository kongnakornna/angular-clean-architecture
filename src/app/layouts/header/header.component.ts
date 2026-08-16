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

  notifications = [
    { id: 1, title: 'งานใหม่ถูกสร้าง', time: '5 นาทีที่แล้ว', read: false },
    { id: 2, title: 'Quotation ถูกอนุมัติ', time: '1 ชั่วโมงที่แล้ว', read: false },
    { id: 3, title: 'สต็อกสินค้าต่ำ', time: '2 ชั่วโมงที่แล้ว', read: true },
  ];

  profileMenu = [
    { label: 'Profile', icon: 'user', route: '/profile' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Logout', icon: 'logout', action: 'logout' },
  ];

  apps = [
    { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
    { label: 'Jobs', icon: 'clipboard', route: '/jobs' },
    { label: 'Customers', icon: 'users', route: '/customers' },
    { label: 'IoT', icon: 'device-desktop', route: '/iot/devices' },
    { label: 'Reports', icon: 'chart-bar', route: '/reports' },
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
    { label: 'Reports', icon: 'chart-bar', route: '/reports' },
  ];

  get isDarkMode(): boolean {
    return this.layout.theme() === 'dark';
  }

  toggleTheme(): void {
    this.layout.update('theme', this.isDarkMode ? 'light' : 'dark');
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
