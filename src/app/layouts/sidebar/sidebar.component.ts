import { Component, Input, inject } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';

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

  private layout = inject(LayoutService);

  get navbarPosition() { return this.layout.snapshot.navbarPosition; }
  get navbarDark() { return this.layout.snapshot.navbarDark; }

  menuItems: MenuItem[] = [
    { label: 'แดชบอร์ด', icon: 'layout-dashboard', route: '/dashboard' },
    {
      label: 'การจัดการงาน', icon: 'clipboard', route: '/jobs',
      children: [
        { label: 'รายการงาน', icon: 'list', route: '/jobs' },
        { label: 'บอร์ดงาน', icon: 'layout-kanban', route: '/jobs/board' },
        { label: 'สร้างงาน', icon: 'plus', route: '/jobs/create' },
      ],
    },
    {
      label: 'ลูกค้า', icon: 'users', route: '/customers',
      children: [
        { label: 'รายการลูกค้า', icon: 'list', route: '/customers' },
        { label: 'เพิ่มลูกค้า', icon: 'plus', route: '/customers/create' },
      ],
    },
    { label: 'ใบเสนอราคา', icon: 'file-text', route: '/quotations' },
    { label: 'ใบสั่งซื้อ', icon: 'shopping-cart', route: '/purchase-orders' },
    { label: 'สินค้าคงคลัง', icon: 'package', route: '/products' },
    { label: 'การชำระเงิน', icon: 'credit-card', route: '/payments' },
    { label: 'ใบแจ้งหนี้', icon: 'report', route: '/invoices' },
    { label: 'เอกสาร', icon: 'folder', route: '/documents' },
    {
      label: 'อีเมล', icon: 'mail', route: '/email/templates',
      children: [
        { label: 'เทมเพลต', icon: 'file-text', route: '/email/templates' },
        { label: 'ส่งอีเมล', icon: 'send', route: '/email/compose' },
        { label: 'บันทึกการส่ง', icon: 'list-check', route: '/email/logs' },
      ],
    },
    { label: 'งานแบตช์', icon: 'clock', route: '/batch/jobs' },
    { label: 'อุปกรณ์ IoT', icon: 'device-desktop', route: '/iot/devices' },
    { label: 'คำสั่งซื้อออนไลน์', icon: 'shopping-bag', route: '/wos/orders' },
    { label: 'รายงาน', icon: 'chart-bar', route: '/reports' },
    {
      label: 'ระบบ', icon: 'settings', route: '/users',
      children: [
        { label: 'ผู้ใช้งาน', icon: 'user-circle', route: '/users' },
        { label: 'บทบาท', icon: 'shield', route: '/roles' },
        { label: 'ภาษา', icon: 'language', route: '/settings/language' },
        { label: 'ตั้งค่าธีม', icon: 'palette', route: '/settings/theme' },
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
