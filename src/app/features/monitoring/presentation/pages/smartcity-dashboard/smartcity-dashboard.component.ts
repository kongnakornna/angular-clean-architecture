import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-smartcity-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="page-header d-print-none mb-3">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">{{ 'monitoring.modules.smartcity' | translate }}</h2>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body text-center py-5">
        <h3>SmartCity Dashboard</h3>
        <p class="text-secondary">Coming soon...</p>
      </div>
    </div>
  `,
})
export class SmartcityDashboardComponent {}
