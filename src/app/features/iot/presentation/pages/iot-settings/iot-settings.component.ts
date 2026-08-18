import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { IOT_REPOSITORY } from '../../../../../core/di/tokens';
import { IIoTRepository } from '../../../domain/repositories/iot.repository';

interface IoTSetting {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'number' | 'select' | 'toggle';
  options?: { label: string; value: string }[];
  group: string;
}

@Component({
  selector: 'app-iot-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './iot-settings.component.html',
  styleUrls: ['./iot-settings.component.scss'],
})
export class IoTSettingsComponent implements OnInit, OnDestroy {
  private iotRepo = inject<IIoTRepository>(IOT_REPOSITORY);
  private destroy$ = new Subject<void>();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private savingSubject = new BehaviorSubject<boolean>(false);
  saving$ = this.savingSubject.asObservable();

  private messageSubject = new BehaviorSubject<{ type: 'success' | 'error'; text: string } | null>(null);
  message$ = this.messageSubject.asObservable();

  settings: IoTSetting[] = [
    { key: 'mqttBroker', label: 'MQTT Broker URL', value: 'mqtt://broker.example.com:1883', type: 'text', group: 'MQTT' },
    { key: 'mqttUsername', label: 'MQTT Username', value: '', type: 'text', group: 'MQTT' },
    { key: 'mqttPassword', label: 'MQTT Password', value: '', type: 'text', group: 'MQTT' },
    { key: 'mqttTopic', label: 'Default Topic', value: 'iot/devices/#', type: 'text', group: 'MQTT' },
    { key: 'influxHost', label: 'InfluxDB Host', value: 'http://localhost:8086', type: 'text', group: 'InfluxDB' },
    { key: 'influxOrg', label: 'Organization', value: 'myorg', type: 'text', group: 'InfluxDB' },
    { key: 'influxBucket', label: 'Default Bucket', value: 'iot_data', type: 'text', group: 'InfluxDB' },
    { key: 'influxToken', label: 'API Token', value: '', type: 'text', group: 'InfluxDB' },
    { key: 'dataRetentionDays', label: 'Data Retention (days)', value: '90', type: 'number', group: 'Data' },
    { key: 'autoCleanup', label: 'Auto Cleanup', value: 'true', type: 'toggle', group: 'Data' },
    { key: 'alertEnabled', label: 'Alert Notifications', value: 'true', type: 'toggle', group: 'Alerts' },
    { key: 'alertThreshold', label: 'Alert Threshold', value: '80', type: 'number', group: 'Alerts' },
  ];

  editedSettings: Record<string, string> = {};
  groups: string[] = [];

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSettings(): void {
    this.loadingSubject.next(true);
    this.groups = [...new Set(this.settings.map(s => s.group))];
    this.settings.forEach(s => this.editedSettings[s.key] = s.value);
    this.loadingSubject.next(false);
  }

  getSettingsByGroup(group: string): IoTSetting[] {
    return this.settings.filter(s => s.group === group);
  }

  save(): void {
    this.savingSubject.next(true);
    this.messageSubject.next(null);

    const config: Record<string, any> = {};
    this.settings.forEach(s => {
      config[s.key] = this.editedSettings[s.key];
    });

    this.iotRepo.updateDeviceConfig({ deviceId: 'system', config })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.savingSubject.next(false);
          this.messageSubject.next({ type: 'success', text: 'Settings saved successfully' });
          this.settings.forEach(s => s.value = this.editedSettings[s.key]);
        },
        error: () => {
          this.savingSubject.next(false);
          this.messageSubject.next({ type: 'error', text: 'Failed to save settings' });
        },
      });
  }

  reset(): void {
    this.settings.forEach(s => this.editedSettings[s.key] = s.value);
    this.messageSubject.next(null);
  }
}
