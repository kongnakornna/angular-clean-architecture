import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { SettingsFormCardComponent } from '../../components/settings-form-card/settings-form-card.component';

@Component({
  selector: 'app-device-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, SettingsFormCardComponent],
  template: `
    <app-settings-form-card [title]="'settings.device.defaultsConfig' | translate" [icon]="'device-desktop'">
      <form (ngSubmit)="onSubmit()">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.defaultRefreshInterval' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="defaultRefreshInterval" name="defaultRefreshInterval">
          </div>
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.defaultPageSize' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="defaultPageSize" name="defaultPageSize">
          </div>
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.dataRetentionDays' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="dataRetentionDays" name="dataRetentionDays">
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.heartbeatInterval' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="heartbeatInterval" name="heartbeatInterval">
          </div>
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.offlineTimeout' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="offlineTimeout" name="offlineTimeout">
          </div>
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.device.gpsAccuracyThreshold' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="gpsAccuracyThreshold" name="gpsAccuracyThreshold">
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.device.defaultTimezone' | translate }}</label>
            <select class="form-select" [(ngModel)]="defaultTimezone" name="defaultTimezone">
              <option value="UTC">UTC</option>
              <option value="Asia/Bangkok">Asia/Bangkok</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="autoRegister" [(ngModel)]="enableAutoRegister" name="enableAutoRegister">
            <label class="form-check-label" for="autoRegister">{{ 'settings.device.enableAutoRegister' | translate }}</label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="geoLocation" [(ngModel)]="enableGeolocation" name="enableGeolocation">
            <label class="form-check-label" for="geoLocation">{{ 'settings.device.enableGeolocation' | translate }}</label>
          </div>
        </div>
        <div class="card-footer bg-transparent mt-auto">
          <div class="btn-list justify-content-end">
            <button type="submit" class="btn btn-primary">{{ 'settings.common.save' | translate }}</button>
          </div>
        </div>
      </form>
    </app-settings-form-card>
  `,
})
export class DeviceSettingsComponent implements OnInit {
  defaultRefreshInterval = 5000;
  defaultPageSize = 20;
  dataRetentionDays = 90;
  heartbeatInterval = 30;
  offlineTimeout = 120;
  gpsAccuracyThreshold = 10;
  defaultTimezone = 'Asia/Bangkok';
  enableAutoRegister = false;
  enableGeolocation = true;

  ngOnInit(): void {}

  onSubmit(): void {
    // TODO: wire to use case
  }
}
