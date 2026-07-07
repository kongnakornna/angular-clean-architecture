import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LayoutService } from '../../../../../core/services/layout.service';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [NgFor],
  template: `
<div class="page-body">
  <div class="container-xl">
    <div class="page-header d-print-none mb-4">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">Theme Settings</h2>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Color mode</h3>
          </div>
          <div class="card-body">
            <label class="form-check">
              <input type="radio" name="theme" value="light" class="form-check-input"
                [checked]="layout.theme() === 'light'"
                (change)="layout.update('theme', 'light')">
              <span class="form-check-label">Light</span>
            </label>
            <label class="form-check">
              <input type="radio" name="theme" value="dark" class="form-check-input"
                [checked]="layout.theme() === 'dark'"
                (change)="layout.update('theme', 'dark')">
              <span class="form-check-label">Dark</span>
            </label>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">Color scheme</h3>
          </div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col-auto" *ngFor="let c of colors">
                <label class="form-colorinput">
                  <input type="radio" name="theme-primary" [value]="c.key" class="form-colorinput-input"
                    [checked]="layout.themePrimary() === c.key"
                    (change)="layout.update('theme-primary', c.key)">
                  <span class="form-colorinput-color" [class]="c.class"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">Font family</h3>
          </div>
          <div class="card-body">
            <div *ngFor="let f of fonts">
              <label class="form-check">
                <input type="radio" name="theme-font" [value]="f" class="form-check-input"
                  [checked]="layout.themeFont() === f"
                  (change)="layout.update('theme-font', f)">
                <span class="form-check-label">{{ f }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">Theme base</h3>
          </div>
          <div class="card-body">
            <div *ngFor="let b of bases">
              <label class="form-check">
                <input type="radio" name="theme-base" [value]="b" class="form-check-input"
                  [checked]="layout.themeBase() === b"
                  (change)="layout.update('theme-base', b)">
                <span class="form-check-label">{{ b }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">Corner Radius</h3>
          </div>
          <div class="card-body">
            <div *ngFor="let r of radii">
              <label class="form-check">
                <input type="radio" name="theme-radius" [value]="r" class="form-check-input"
                  [checked]="layout.themeRadius() === r"
                  (change)="layout.update('theme-radius', r)">
                <span class="form-check-label">{{ r }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-body text-center py-5">
            <button type="button" class="btn btn-outline-danger w-100" (click)="layout.reset()">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
})
export class ThemeSettingsComponent {
  protected layout = inject(LayoutService);

  colors = [
    { key: 'blue', class: 'bg-blue' },
    { key: 'azure', class: 'bg-azure' },
    { key: 'indigo', class: 'bg-indigo' },
    { key: 'purple', class: 'bg-purple' },
    { key: 'pink', class: 'bg-pink' },
    { key: 'red', class: 'bg-red' },
    { key: 'orange', class: 'bg-orange' },
    { key: 'yellow', class: 'bg-yellow' },
    { key: 'lime', class: 'bg-lime' },
    { key: 'green', class: 'bg-green' },
    { key: 'teal', class: 'bg-teal' },
    { key: 'cyan', class: 'bg-cyan' },
  ];
  fonts = ['sans-serif', 'serif', 'monospace', 'comic'];
  bases = ['slate', 'gray', 'zinc', 'neutral', 'stone'];
  radii = ['0', '0.5', '1', '1.5', '2'];
}
