import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  unreadCount = 3;

  notifications = [
    { id: 1, title: 'งานใหม่ถูกสร้าง', time: '5 นาทีที่แล้ว', read: false },
    { id: 2, title: 'Quotation ถูกอนุมัติ', time: '1 ชั่วโมงที่แล้ว', read: false },
    { id: 3, title: 'สต็อกสินค้าต่ำ', time: '2 ชั่วโมงที่แล้ว', read: true },
  ];

  profileMenu = [
    { label: 'โปรไฟล์', icon: 'user', route: '/profile' },
    { label: 'ตั้งค่า', icon: 'settings', route: '/settings' },
    { label: 'ออกจากระบบ', icon: 'logout', action: 'logout' },
  ];

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
