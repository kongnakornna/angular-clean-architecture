import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LayoutService, LayoutSettings } from '../../../../../core/services/layout.service';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [NgFor, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-body">
  <div class="container-xl">
    <div class="page-header d-print-none mb-4">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">{{ 'layout.settings.title' | translate }}</h2>
          <div class="text-muted mt-1">{{ 'dashboard.subtitle' | translate }}</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">{{ 'layout.settings.layoutMode' | translate }}</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.layoutMode' | translate }}</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let m of layoutModes" type="button" class="btn" [class.btn-primary]="s.layoutMode === m.value" [class.btn-outline-primary]="s.layoutMode !== m.value" (click)="update('layoutMode', m.value)">{{ m.label | translate }}</button>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.navbarPosition' | translate }}</label>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn" [class.btn-primary]="s.navbarPosition === 'left'" [class.btn-outline-primary]="s.navbarPosition !== 'left'" (click)="update('navbarPosition', 'left')">{{ 'layout.settings.navbarLeft' | translate }}</button>
                <button type="button" class="btn" [class.btn-primary]="s.navbarPosition === 'right'" [class.btn-outline-primary]="s.navbarPosition !== 'right'" (click)="update('navbarPosition', 'right')">{{ 'layout.settings.navbarRight' | translate }}</button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarDark" (change)="toggle('navbarDark')">
                <span class="form-check-label">{{ 'layout.settings.navbarDark' | translate }}</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarOverlap" (change)="toggle('navbarOverlap')">
                <span class="form-check-label">{{ 'layout.settings.navbarOverlap' | translate }}</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarSticky" (change)="toggle('navbarSticky')">
                <span class="form-check-label">{{ 'layout.settings.navbarSticky' | translate }}</span>
              </label>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" [checked]="s.rtlMode" (change)="toggle('rtlMode')">
                <span class="form-check-label">{{ 'layout.settings.rtlMode' | translate }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">{{ 'layout.settings.colorScheme' | translate }}</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.colorScheme' | translate }}</label>
              <div class="row g-2">
                <div class="col-auto" *ngFor="let c of colorSchemes">
                  <a href="javascript:void(0)" class="btn btn-icon rounded-circle" [style.background]="'var(--tblr-' + c.value + ')'" [class.btn-primary]="s.colorScheme === c.value" [class.btn-outline-primary]="s.colorScheme !== c.value" (click)="update('colorScheme', c.value)" [title]="c.label | translate"></a>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.fontFamily' | translate }}</label>
              <select class="form-select" [value]="s.fontFamily" (change)="update('fontFamily', $any($event.target).value)">
                <option *ngFor="let f of fontFamilies" [value]="f.value">{{ f.label | translate }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.themeBase' | translate }}</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let b of themeBases" type="button" class="btn btn-sm" [class.btn-primary]="s.themeBase === b.value" [class.btn-outline-primary]="s.themeBase !== b.value" (click)="update('themeBase', b.value)">{{ b.label | translate }}</button>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">{{ 'layout.settings.borderRadius' | translate }} ({{ s.borderRadius }})</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let r of radiusOptions" type="button" class="btn btn-sm" [class.btn-primary]="s.borderRadius === r" [class.btn-outline-primary]="s.borderRadius !== r" (click)="update('borderRadius', r)">{{ r }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">{{ 'common.view' | translate }}</h3>
          </div>
          <div class="card-body text-center py-5">
            <i-tabler name="palette" class="text-muted mb-3" size="64"></i-tabler>
            <p class="text-muted">{{ 'common.loading' | translate }}</p>
            <button type="button" class="btn btn-outline-danger w-100" (click)="reset()">
              <i-tabler name="refresh" class="me-1" size="16"></i-tabler>
              {{ 'layout.settings.reset' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
})
export class ThemeSettingsComponent {
  private layout = inject(LayoutService);

  get s(): LayoutSettings { return this.layout.snapshot; }

  layoutModes = [
    { value: 'vertical', label: 'layout.settings.layoutVertical' },
    { value: 'fluid', label: 'layout.settings.layoutFluid' },
    { value: 'boxed', label: 'layout.settings.layoutBoxed' },
    { value: 'condensed', label: 'layout.settings.layoutCondensed' },
  ];
  colorSchemes = [
    { value: 'blue', label: 'layout.settings.colorBlue' },
    { value: 'azure', label: 'layout.settings.colorAzure' },
    { value: 'indigo', label: 'layout.settings.colorIndigo' },
    { value: 'purple', label: 'layout.settings.colorPurple' },
    { value: 'pink', label: 'layout.settings.colorPink' },
    { value: 'red', label: 'layout.settings.colorRed' },
    { value: 'orange', label: 'layout.settings.colorOrange' },
    { value: 'yellow', label: 'layout.settings.colorYellow' },
    { value: 'lime', label: 'layout.settings.colorLime' },
    { value: 'green', label: 'layout.settings.colorGreen' },
    { value: 'teal', label: 'layout.settings.colorTeal' },
    { value: 'cyan', label: 'layout.settings.colorCyan' },
  ];
  fontFamilies = [
    { value: 'sans-serif', label: 'layout.settings.fontSansSerif' },
    { value: 'serif', label: 'layout.settings.fontSerif' },
    { value: 'monospace', label: 'layout.settings.fontMonospace' },
    { value: 'comic', label: 'layout.settings.fontComic' },
  ];
  themeBases = [
    { value: 'slate', label: 'layout.settings.themeSlate' },
    { value: 'gray', label: 'layout.settings.themeGray' },
    { value: 'zinc', label: 'layout.settings.themeZinc' },
    { value: 'neutral', label: 'layout.settings.themeNeutral' },
    { value: 'stone', label: 'layout.settings.themeStone' },
  ];
  radiusOptions = [0, 0.5, 1, 1.5, 2];

  update(key: keyof LayoutSettings, value: any): void {
    this.layout.update({ [key]: value });
  }

  reset(): void {
    this.layout.reset();
  }

  toggle(key: keyof LayoutSettings): void {
    this.layout.update({ [key]: !this.s[key] });
  }
}
