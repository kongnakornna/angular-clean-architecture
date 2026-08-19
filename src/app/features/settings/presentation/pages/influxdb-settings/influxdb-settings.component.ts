import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-influxdb-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="card">
      <div class="card-body">
        <form>
          <div class="mb-3">
            <label class="form-label">{{ 'settings.influxdb.url' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="influxUrl" name="url" placeholder="http://localhost:8086">
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">{{ 'settings.influxdb.org' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="org" name="org" placeholder="my-org">
            </div>
            <div class="col-md-6">
              <label class="form-label">{{ 'settings.influxdb.bucket' | translate }}</label>
              <input type="text" class="form-control" [(ngModel)]="bucket" name="bucket" placeholder="my-bucket">
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">{{ 'settings.influxdb.token' | translate }}</label>
            <input type="password" class="form-control" [(ngModel)]="token" name="token">
          </div>
          <div class="card-footer bg-transparent mt-auto">
            <div class="btn-list justify-content-end">
              <button type="button" class="btn btn-primary">{{ 'settings.influxdb.save' | translate }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class InfluxDbSettingsComponent {
  influxUrl = 'http://localhost:8086';
  org = '';
  bucket = '';
  token = '';
}
