import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-email-compose',
  standalone: true,
  imports: [FormsModule, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'email.composeTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'email.composeSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/email/logs" class="btn btn-outline-secondary">{{ 'email.viewLogs' | translate }}</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="mb-3">
        <label class="form-label">{{ 'email.to' | translate }}</label>
        <input type="email" class="form-control" name="to" [(ngModel)]="to" placeholder="email@example.com">
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'email.subject' | translate }}</label>
        <input type="text" class="form-control" name="subject" [(ngModel)]="subject" placeholder="{{ 'email.subjectPlaceholder' | translate }}">
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'email.body' | translate }}</label>
        <textarea class="form-control" name="body" [(ngModel)]="body" rows="10" placeholder="{{ 'email.bodyPlaceholder' | translate }}"></textarea>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">
          <i-tabler name="send" class="icon"></i-tabler> {{ 'email.send' | translate }}
        </button>
      </div>
    </form>
  </div>
</div>
  `,
  styleUrls: ['./email-compose.component.scss'],
})
export class EmailComposeComponent {
  to = '';
  subject = '';
  body = '';
}
