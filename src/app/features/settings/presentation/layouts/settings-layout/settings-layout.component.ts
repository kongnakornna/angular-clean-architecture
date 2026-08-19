import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

interface SettingsMenuItem {
  key: string;
  labelKey: string;
  route: string;
  icon: string;
  group: 'automation' | 'alerting' | 'storage' | 'device' | 'connectivity' | 'notification' | 'system';
}

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, TablerIconComponent, TranslatePipe],
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent {
  menuItems: SettingsMenuItem[] = [
    { key: 'schedule', labelKey: 'settings.menuItems.schedule', route: '/settings/schedule', icon: 'calendar-event', group: 'automation' },
    { key: 'alarm', labelKey: 'settings.menuItems.alarm', route: '/settings/alarm', icon: 'bell', group: 'alerting' },
    { key: 'influx', labelKey: 'settings.menuItems.influxdb', route: '/settings/influx', icon: 'database', group: 'storage' },
    { key: 'device', labelKey: 'settings.menuItems.devices', route: '/settings/device', icon: 'device-desktop', group: 'device' },
    { key: 'location', labelKey: 'settings.menuItems.locations', route: '/settings/location', icon: 'map-pin', group: 'device' },
    { key: 'hardware', labelKey: 'settings.menuItems.hardware', route: '/settings/hardware', icon: 'cpu', group: 'device' },
    { key: 'sensor', labelKey: 'settings.menuItems.sensors', route: '/settings/sensor', icon: 'thermometer', group: 'device' },
    { key: 'nodered', labelKey: 'settings.menuItems.nodered', route: '/settings/nodered', icon: 'server', group: 'connectivity' },
    { key: 'mqtt', labelKey: 'settings.menuItems.mqtt', route: '/settings/mqtt', icon: 'radio', group: 'connectivity' },
    { key: 'email', labelKey: 'settings.menuItems.email', route: '/settings/email', icon: 'mail', group: 'notification' },
    { key: 'line', labelKey: 'settings.menuItems.line', route: '/settings/line', icon: 'message-circle', group: 'notification' },
    { key: 'sms', labelKey: 'settings.menuItems.sms', route: '/settings/sms', icon: 'phone', group: 'notification' },
    { key: 'host', labelKey: 'settings.menuItems.hosts', route: '/settings/host', icon: 'server', group: 'system' },
    { key: 'api', labelKey: 'settings.menuItems.api', route: '/settings/api', icon: 'api', group: 'system' },
    { key: 'token', labelKey: 'settings.menuItems.tokens', route: '/settings/token', icon: 'key', group: 'system' },
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
}
