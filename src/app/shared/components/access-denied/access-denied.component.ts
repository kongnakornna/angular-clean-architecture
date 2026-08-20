import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="page page-center">
      <div class="container-xl">
        <div class="empty">
          <div class="empty-icon">
            <h1>403</h1>
          </div>
          <p class="empty-title">{{ 'errors.403' | translate }}</p>
          <p class="empty-subtitle text-secondary">
            {{ 'errors.403' | translate }}
          </p>
          <div class="empty-action">
            <button class="btn btn-primary" (click)="goToDashboard()">{{ 'nav.dashboard' | translate }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccessDeniedComponent {
  private router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
