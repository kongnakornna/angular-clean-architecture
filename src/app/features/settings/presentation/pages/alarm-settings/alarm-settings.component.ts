import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { SettingsFormCardComponent } from '../../components/settings-form-card/settings-form-card.component';

@Component({
  selector: 'app-alarm-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, SettingsFormCardComponent],
  template: `
    <app-settings-form-card [title]="'settings.alarm.generalConfig' | translate" [icon]="'settings'">
      <form (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="alarmEnabled" [(ngModel)]="enabled" name="enabled">
            <label class="form-check-label" for="alarmEnabled">{{ 'settings.alarm.enableAlarm' | translate }}</label>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.cooldownMinutes' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="cooldownMinutes" name="cooldownMinutes">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.escalateAfterMinutes' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="escalateAfterMinutes" name="escalateAfterMinutes">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.maxAlertsPerHour' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="maxAlertsPerHour" name="maxAlertsPerHour">
          </div>
        </div>
        <h5 class="mt-4 mb-3">{{ 'settings.alarm.defaultThreshold' | translate }}</h5>
        <div class="row g-3 mb-3">
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.warningMin' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="warningMin" name="warningMin">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.warningMax' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="warningMax" name="warningMax">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.alertMin' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="alertMin" name="alertMin">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.alarm.alertMax' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="alertMax" name="alertMax">
          </div>
        </div>
        <h5 class="mt-4 mb-3">{{ 'settings.alarm.notifyChannels' | translate }}</h5>
        <div class="mb-3">
          <div class="form-check form-check-inline" *ngFor="let ch of channels">
            <input class="form-check-input" type="checkbox" [id]="'ch-'+ch" [checked]="notifyChannels.includes(ch)" (change)="toggleChannel(ch)">
            <label class="form-check-label" [for]="'ch-'+ch">{{ ch }}</label>
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
export class AlarmSettingsComponent implements OnInit {
  enabled = true;
  cooldownMinutes = 5;
  escalateAfterMinutes = 15;
  maxAlertsPerHour = 10;
  warningMin = 0;
  warningMax = 50;
  alertMin = 50;
  alertMax = 100;
  channels = ['email', 'line', 'sms', 'webhook'];
  notifyChannels: string[] = ['email'];

  ngOnInit(): void {}

  toggleChannel(ch: string): void {
    const idx = this.notifyChannels.indexOf(ch);
    if (idx >= 0) this.notifyChannels.splice(idx, 1);
    else this.notifyChannels.push(ch);
  }

  onSubmit(): void {
    // TODO: wire to use case
  }
}
