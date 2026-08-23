import { Component, Input, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../core/services/permission.service';
import { MENU_CONFIG, MenuItem as ConfigMenuItem } from '../../core/config/menu.config';

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
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  @Input() transparent = false;
  @Input() end = false;
  @Input() background = '';
  @Input() dark = false;

  private router = inject(Router);
  private permissionService = inject(PermissionService);

  isActiveRoute(route: string | undefined): boolean {
    return route ? this.router.isActive(route, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' }) : false;
  }

  isChildActive(children: MenuItem[] | undefined): boolean {
    if (!children) {return false;}
    return children.some(c => this.isActiveRoute(c.route) || this.isChildActive(c.children));
  }

  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.permissionService.filterByPermission(MENU_CONFIG, (item) => item.permission)
      .subscribe((filteredMenu) => {
        this.menuItems = filteredMenu.map((item) => this.mapConfigToMenuItem(item));
      });
  }

  private mapConfigToMenuItem(item: ConfigMenuItem): MenuItem {
    return {
      label: item.label,
      icon: item.icon,
      route: item.route,
      children: item.children?.map((child) => this.mapConfigToMenuItem(child)),
    };
  }

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
