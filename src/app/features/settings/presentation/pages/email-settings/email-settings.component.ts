import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { SettingsFormCardComponent } from '../../components/settings-form-card/settings-form-card.component';
import { ConnectionTestButtonComponent } from '../../components/connection-test-button/connection-test-button.component';

@Component({
  selector: 'app-email-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, SettingsFormCardComponent, ConnectionTestButtonComponent],
  template: `
    <app-settings-form-card [title]="'settings.email.smtpConfig' | translate" [icon]="'mail'">
      <form (ngSubmit)="onSubmit()">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.provider' | translate }}</label>
            <select class="form-select" [(ngModel)]="provider" name="provider">
              <option value="smtp">SMTP</option>
              <option value="sendgrid">SendGrid</option>
              <option value="ses">AWS SES</option>
              <option value="mailgun">Mailgun</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.encryption' | translate }}</label>
            <select class="form-select" [(ngModel)]="encryption" name="encryption">
              <option value="none">None</option>
              <option value="ssl">SSL</option>
              <option value="tls">TLS</option>
            </select>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-8">
            <label class="form-label">{{ 'settings.email.smtpHost' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="host" name="host" placeholder="smtp.gmail.com">
          </div>
          <div class="col-md-4">
            <label class="form-label">{{ 'settings.email.smtpPort' | translate }}</label>
            <input type="number" class="form-control" [(ngModel)]="port" name="port" placeholder="587">
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.username' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="username" name="username">
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.password' | translate }}</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password">
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.fromAddress' | translate }}</label>
            <input type="email" class="form-control" [(ngModel)]="fromAddress" name="fromAddress" placeholder="noreply@example.com">
          </div>
          <div class="col-md-6">
            <label class="form-label">{{ 'settings.email.fromName' | translate }}</label>
            <input type="text" class="form-control" [(ngModel)]="fromName" name="fromName" placeholder="iCmon Platform">
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="emailEnabled" [(ngModel)]="enabled" name="enabled">
            <label class="form-check-label" for="emailEnabled">{{ 'settings.common.enabled' | translate }}</label>
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
export class EmailSettingsComponent implements OnInit {
  provider = 'smtp';
  host = '';
  port = 587;
  username = '';
  password = '';
  fromAddress = '';
  fromName = '';
  encryption: 'none' | 'ssl' | 'tls' = 'tls';
  enabled = true;

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
