import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../layouts/default/default.component';

@Component({
  selector: 'app-tabler-dashboard',
  standalone: true,
  imports: [DefaultLayoutComponent],
  template: `
    <app-tabler-default-layout title="Dashboard" pretitle="Overview" [sidebar]="true">
      <div class="row row-deck row-cards">
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Sales</div>
              </div>
              <div class="h1 mb-3">75</div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Revenue</div>
              </div>
              <div class="h1 mb-3">$2,500</div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Users</div>
              </div>
              <div class="h1 mb-3">1,284</div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Growth</div>
              </div>
              <div class="h1 mb-3">+12.5%</div>
            </div>
          </div>
        </div>
      </div>
    </app-tabler-default-layout>
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class DashboardPageComponent {}
