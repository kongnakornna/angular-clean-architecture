export interface MenuItem {
  label: string;
  route: string;
  icon: string;
  permission: string;
  children?: MenuItem[];
}

export const MENU_CONFIG: MenuItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard', permission: 'dashboard.view' },
  { label: 'Customers', route: '/customers', icon: 'users', permission: 'customer.view' },
  { label: 'Quotations', route: '/quotations', icon: 'file-text', permission: 'quotation.view' },
  { label: 'Purchase Orders', route: '/purchase-orders', icon: 'shopping-cart', permission: 'purchase_order.view' },
  { label: 'Products', route: '/products', icon: 'package', permission: 'inventory.view' },
  { label: 'Payments', route: '/payments', icon: 'credit-card', permission: 'payment.view' },
  { label: 'Documents', route: '/documents', icon: 'folder', permission: 'document.view' },
  { label: 'Email', route: '/email/templates', icon: 'mail', permission: 'email.view' },
  { label: 'Batch Jobs', route: '/batch/jobs', icon: 'layers', permission: 'batch.view' },
  { label: 'IoT Devices', route: '/iot/devices', icon: 'cpu', permission: 'iot.view' },
  { label: 'Work Orders', route: '/wos/orders', icon: 'clipboard', permission: 'wos.view' },
  { label: 'Job Cards', route: '/jobs', icon: 'briefcase', permission: 'job_card.view' },
  { label: 'Users', route: '/users', icon: 'user', permission: 'user.view' },
  { label: 'Roles', route: '/roles', icon: 'shield', permission: 'role.view' },
];
