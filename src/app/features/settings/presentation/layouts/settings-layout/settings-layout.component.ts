import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { filter } from 'rxjs';

interface SettingsMenuItem {
  key: string;
  labelKey: string;
  route: string;
  group: 'automation' | 'alerting' | 'storage' | 'device' | 'connectivity' | 'notification' | 'system';
}

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, TablerIconComponent, TranslatePipe],
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent implements OnInit {
  menuItems: SettingsMenuItem[] = [
    { key: 'schedule', labelKey: 'settings.menuItems.schedule', route: '/settings/schedule', group: 'automation' },
    { key: 'alarm', labelKey: 'settings.menuItems.alarm', route: '/settings/alarm', group: 'alerting' },
    { key: 'influx', labelKey: 'settings.menuItems.influxdb', route: '/settings/influx', group: 'storage' },
    { key: 'device', labelKey: 'settings.menuItems.devices', route: '/settings/device', group: 'device' },
    { key: 'location', labelKey: 'settings.menuItems.locations', route: '/settings/location', group: 'device' },
    { key: 'hardware', labelKey: 'settings.menuItems.hardware', route: '/settings/hardware', group: 'device' },
    { key: 'sensor', labelKey: 'settings.menuItems.sensors', route: '/settings/sensor', group: 'device' },
    { key: 'nodered', labelKey: 'settings.menuItems.nodered', route: '/settings/nodered', group: 'connectivity' },
    { key: 'mqtt', labelKey: 'settings.menuItems.mqtt', route: '/settings/mqtt', group: 'connectivity' },
    { key: 'email', labelKey: 'settings.menuItems.email', route: '/settings/email', group: 'notification' },
    { key: 'line', labelKey: 'settings.menuItems.line', route: '/settings/line', group: 'notification' },
    { key: 'sms', labelKey: 'settings.menuItems.sms', route: '/settings/sms', group: 'notification' },
    { key: 'host', labelKey: 'settings.menuItems.hosts', route: '/settings/host', group: 'system' },
    { key: 'api', labelKey: 'settings.menuItems.api', route: '/settings/api', group: 'system' },
    { key: 'token', labelKey: 'settings.menuItems.tokens', route: '/settings/token', group: 'system' },
  ];

  menuGroups = [
    { key: 'automation', labelKey: 'settings.menuGroup.automation', items: this.menuItems.filter(i => i.group === 'automation') },
    { key: 'alerting', labelKey: 'settings.menuGroup.alerting', items: this.menuItems.filter(i => i.group === 'alerting') },
    { key: 'storage', labelKey: 'settings.menuGroup.storage', items: this.menuItems.filter(i => i.group === 'storage') },
    { key: 'device', labelKey: 'settings.menuGroup.device', items: this.menuItems.filter(i => i.group === 'device') },
    { key: 'connectivity', labelKey: 'settings.menuGroup.connectivity', items: this.menuItems.filter(i => i.group === 'connectivity') },
    { key: 'notification', labelKey: 'settings.menuGroup.notification', items: this.menuItems.filter(i => i.group === 'notification') },
    { key: 'system', labelKey: 'settings.menuGroup.system', items: this.menuItems.filter(i => i.group === 'system') },
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
