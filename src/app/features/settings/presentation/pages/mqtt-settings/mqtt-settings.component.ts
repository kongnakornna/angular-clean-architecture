import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { SettingsFormCardComponent } from '../../components/settings-form-card/settings-form-card.component';
import { ConnectionTestButtonComponent } from '../../components/connection-test-button/connection-test-button.component';

@Component({
  selector: 'app-mqtt-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, SettingsFormCardComponent, ConnectionTestButtonComponent],
  template: `
    <app-settings-form-card [title]="'settings.mqtt.brokerConfig' | translate" [icon]="'radio'">
      <form (ngSubmit)="onSubmit()">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.mqtt.host' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="brokerHost" name="brokerHost" placeholder="mqtt.example.com">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.port' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="brokerPort" name="brokerPort" placeholder="1883">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.protocol' | translate }}</label>
            <select class="form-select" [(ngModel)]="protocol" name="protocol">
              <option value="mqtt">mqtt</option>
              <option value="mqtts">mqtts</option>
              <option value="ws">ws</option>
              <option value="wss">wss</option>
            </select>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.mqtt.username' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="username" name="username">
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.mqtt.password' | translate }}</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password">
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.clientId' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="clientId" name="clientId">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.keepalive' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="keepalive" name="keepalive">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.reconnectPeriod' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="reconnectPeriod" name="reconnectPeriod">
          </div>
          <div class="col-md-3">
            <label class="form-label">{{ 'settings.mqtt.qos' | translate }}</label>
            <select class="form-select" [(ngModel)]="qos" name="qos">
              <option [value]="0">0</option>
              <option [value]="1">1</option>
              <option [value]="2">2</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="mqttClean" [(ngModel)]="clean" name="clean">
            <label class="form-check-label" for="mqttClean">{{ 'settings.mqtt.clean' | translate }}</label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="mqttRetain" [(ngModel)]="retain" name="retain">
            <label class="form-check-label" for="mqttRetain">{{ 'settings.mqtt.retain' | translate }}</label>
          </div>
        </div>
        <div class="card-footer bg-transparent mt-auto">
          <div class="btn-list justify-content-end d-flex gap-2">
            <button type="submit" class="btn btn-primary">{{ 'settings.common.save' | translate }}</button>
            <app-connection-test-button (test)="testConnection()" [testing]="(testing$ | async) ?? false" [result]="testResult$ | async"></app-connection-test-button>
          </div>
        </div>
      </form>
    </app-settings-form-card>
  `,
})
export class MqttSettingsComponent implements OnInit {
  brokerHost = '';
  brokerPort = 1883;
  protocol = 'mqtt';
  username = '';
  password = '';
  clientId = '';
  keepalive = 60;
  reconnectPeriod = 1000;
  qos: 0 | 1 | 2 = 0;
  clean = true;
  retain = false;

  private testingSubject = new BehaviorSubject<boolean>(false);
  testing$ = this.testingSubject.asObservable();
  private testResultSubject = new BehaviorSubject<'success' | 'error' | null>(null);
  testResult$ = this.testResultSubject.asObservable();

  ngOnInit(): void {}

  testConnection(): void {
    this.testingSubject.next(true);
    this.testResultSubject.next(null);
    setTimeout(() => {
      this.testingSubject.next(false);
      this.testResultSubject.next('success');
    }, 2000);
  }

  onSubmit(): void {
    // TODO: wire to use case
  }
}
