import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  template: `
    <div class="page page-center">
      <div class="container-xl">
        <div class="empty">
          <div class="empty-icon">
            <h1>403</h1>
          </div>
          <p class="empty-title">Access Denied</p>
          <p class="empty-subtitle text-secondary">
            You don't have permission to access this page.
          </p>
          <div class="empty-action">
            <button class="btn btn-primary" (click)="goToDashboard()">Go to Dashboard</button>
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
