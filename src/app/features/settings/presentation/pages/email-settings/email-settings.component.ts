import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-email-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, TablerIconComponent],
  template: `
    <div class="page-header d-print-none">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">{{ 'settings.email.title' | translate }}</h2>
          <div class="text-secondary mt-1">{{ 'settings.email.subtitle' | translate }}</div>
        </div>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <div class="alert alert-info">
          <i-tabler name="info-circle" class="icon"></i-tabler>
          {{ 'settings.email.redirectInfo' | translate }}
        </div>
        <a routerLink="/email/templates" class="btn btn-primary">{{ 'settings.email.goToEmail' | translate }}</a>
      </div>
    </div>
  `,
})
export class EmailSettingsComponent {}
