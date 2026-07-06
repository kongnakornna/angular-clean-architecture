import { Component, Input } from '@angular/core';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isCollapsed = false;

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
    { label: 'เอกสาร', icon: 'folder', route: '/documents' },
    { label: 'อุปกรณ์ IoT', icon: 'device-desktop', route: '/iot/devices' },
    { label: 'คำสั่งซื้อออนไลน์', icon: 'shopping-bag', route: '/wos/orders' },
    {
      label: 'ระบบ', icon: 'settings', route: '/settings',
      children: [
        { label: 'ผู้ใช้งาน', icon: 'user-circle', route: '/users' },
        { label: 'บทบาท', icon: 'shield', route: '/roles' },
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
