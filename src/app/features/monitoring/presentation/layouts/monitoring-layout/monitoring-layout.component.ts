import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { filter } from 'rxjs';

interface MonitoringMenuItem {
  key: string;
  labelKey: string;
  route: string;
  group: 'modules';
}

@Component({
  selector: 'app-monitoring-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, TablerIconComponent, TranslatePipe],
  templateUrl: './monitoring-layout.component.html',
  styleUrls: ['./monitoring-layout.component.scss'],
})
export class MonitoringLayoutComponent implements OnInit {
  menuItems: MonitoringMenuItem[] = [
    { key: 'smarthome', labelKey: 'monitoring.modules.smarthome', route: '/monitoring/smarthome', group: 'modules' },
    { key: 'smartcity', labelKey: 'monitoring.modules.smartcity', route: '/monitoring/smartcity', group: 'modules' },
    { key: 'smartmonitor', labelKey: 'monitoring.modules.smartmonitor', route: '/monitoring/smartmonitor', group: 'modules' },
    { key: 'industry', labelKey: 'monitoring.modules.industry', route: '/monitoring/industry', group: 'modules' },
    { key: 'smartsolarfarm', labelKey: 'monitoring.modules.smartsolarfarm', route: '/monitoring/smartsolarfarm', group: 'modules' },
  ];

  menuGroups = [
    { key: 'modules', labelKey: 'monitoring.menuGroup.modules', items: this.menuItems.filter(i => i.group === 'modules') },
  ];

  expandedGroups = new Set<string>();
  sidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.expandGroupForCurrentRoute();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.expandGroupForCurrentRoute());
  }

  toggleGroup(key: string): void {
    if (this.expandedGroups.has(key)) {
      this.expandedGroups.delete(key);
    } else {
      this.expandedGroups.add(key);
    }
  }

  isGroupExpanded(key: string): boolean {
    return this.expandedGroups.has(key);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    if (this.sidebarCollapsed) {
      this.expandedGroups.clear();
    } else {
      this.expandGroupForCurrentRoute();
    }
  }

  private expandGroupForCurrentRoute(): void {
    const currentUrl = this.router.url;
    for (const item of this.menuItems) {
      if (currentUrl.startsWith(item.route)) {
        this.expandedGroups.add(item.group);
        break;
      }
    }
  }
}
