import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiFallbackService, EndpointHealth } from '../../../../../core/services/api-fallback.service';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-api-health',
  standalone: true,
  imports: [CommonModule, TablerIconComponent],
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i-tabler name="heart-rate-monitor" class="me-2"></i-tabler>
          API Health Status
        </h3>
        <div class="card-subtitle">
          Active: <strong>{{ activeEndpoint?.name || 'None' }}</strong>
        </div>
      </div>
      <div class="card-body">
        <div class="list-group list-group-flush">
          @for (health of endpoints; track health.endpoint.url) {
            <div class="list-group-item" [class.list-group-item-danger]="!health.isHealthy">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <span 
                    class="status-indicator me-3" 
                    [class.bg-success]="health.isHealthy" 
                    [class.bg-danger]="!health.isHealthy"
                  ></span>
                  <div>
                    <div class="fw-bold">{{ health.endpoint.name }}</div>
                    <small class="text-muted d-block">{{ health.endpoint.url }}</small>
                    <small class="text-muted">Priority: {{ health.endpoint.priority }}</small>
                  </div>
                </div>
                <div class="text-end">
                  @if (health.failureCount > 0) {
                    <span class="badge bg-danger">Failures: {{ health.failureCount }}</span>
                  }
                  <br>
                  <small class="text-muted">
                    Last checked: {{ health.lastChecked | date:'short' }}
                  </small>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" (click)="refreshHealth()">
          <i-tabler name="refresh" class="me-1"></i-tabler>
          Refresh
        </button>
      </div>
    </div>
  `,
  styles: [`
    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }
  `]
})
export class ApiHealthComponent implements OnInit, OnDestroy {
  private fallbackService = inject(ApiFallbackService);

  endpoints: EndpointHealth[] = [];
  activeEndpoint: { name: string; url: string } | null = null;
  private subscription?: Subscription;

  ngOnInit(): void {
    this.loadHealthData();
    this.subscription = this.fallbackService.getActiveEndpoint().subscribe(endpoint => {
      this.activeEndpoint = endpoint;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadHealthData(): void {
    this.endpoints = this.fallbackService.getEndpointsHealth();
  }

  refreshHealth(): void {
    this.fallbackService.checkNow();
    this.loadHealthData();
  }
}
