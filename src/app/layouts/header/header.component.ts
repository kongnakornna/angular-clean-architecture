import { Component, EventEmitter, Output, inject } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

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

  get isDarkMode(): boolean {
    return this.layout.theme() === 'dark';
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  toggleTheme(): void {
    this.layout.update('theme', this.isDarkMode ? 'light' : 'dark');
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
