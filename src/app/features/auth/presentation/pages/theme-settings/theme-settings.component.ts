import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LayoutService, LayoutSettings } from '../../../../../core/services/layout.service';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-theme-settings',
  standalone: true,
  imports: [NgFor, TablerIconComponent],
  template: `
<div class="page-body">
  <div class="container-xl">
    <div class="page-header d-print-none mb-4">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">ตั้งค่าธีม</h2>
          <div class="text-muted mt-1">ปรับแต่งลักษณะการแสดงผลของระบบ</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">เค้าโครง</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">รูปแบบเค้าโครง</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let m of layoutModes" type="button" class="btn" [class.btn-primary]="s.layoutMode === m.value" [class.btn-outline-primary]="s.layoutMode !== m.value" (click)="update('layoutMode', m.value)">{{ m.label }}</button>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">ตำแหน่งเมนู</label>
              <div class="btn-group w-100" role="group">
                <button type="button" class="btn" [class.btn-primary]="s.navbarPosition === 'left'" [class.btn-outline-primary]="s.navbarPosition !== 'left'" (click)="update('navbarPosition', 'left')">ซ้าย</button>
                <button type="button" class="btn" [class.btn-primary]="s.navbarPosition === 'right'" [class.btn-outline-primary]="s.navbarPosition !== 'right'" (click)="update('navbarPosition', 'right')">ขวา</button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarDark" (change)="toggle('navbarDark')">
                <span class="form-check-label">Navbar สีเข้ม</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarOverlap" (change)="toggle('navbarOverlap')">
                <span class="form-check-label">Navbar ทับเนื้อหา</span>
              </label>
              <label class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" [checked]="s.navbarSticky" (change)="toggle('navbarSticky')">
                <span class="form-check-label">Navbar ติดด้านบน</span>
              </label>
              <label class="form-check form-switch">
                <input class="form-check-input" type="checkbox" [checked]="s.rtlMode" (change)="toggle('rtlMode')">
                <span class="form-check-label">โหมด RTL</span>
              </label>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header">
            <h3 class="card-title">สีและแบบอักษร</h3>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label">สีหลัก</label>
              <div class="row g-2">
                <div class="col-auto" *ngFor="let c of colorSchemes">
                  <a href="javascript:void(0)" class="btn btn-icon rounded-circle" [style.background]="'var(--tblr-' + c.value + ')'" [class.btn-primary]="s.colorScheme === c.value" [class.btn-outline-primary]="s.colorScheme !== c.value" (click)="update('colorScheme', c.value)" [title]="c.label"></a>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">แบบอักษร</label>
              <select class="form-select" [value]="s.fontFamily" (change)="update('fontFamily', $any($event.target).value)">
                <option *ngFor="let f of fontFamilies" [value]="f.value">{{ f.label }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label">ธีมฐาน</label>
              <div class="btn-group w-100" role="group">
                <button *ngFor="let b of themeBases" type="button" class="btn btn-sm" [class.btn-primary]="s.themeBase === b.value" [class.btn-outline-primary]="s.themeBase !== b.value" (click)="update('themeBase', b.value)">{{ b.label }}</button>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">มุมโค้ง ({{ s.borderRadius }})</label>
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
            <h3 class="card-title">ตัวอย่าง</h3>
          </div>
          <div class="card-body text-center py-5">
            <i-tabler name="palette" class="text-muted mb-3" size="64"></i-tabler>
            <p class="text-muted">การเปลี่ยนแปลงจะแสดงผลทันที</p>
            <button type="button" class="btn btn-outline-danger w-100" (click)="reset()">
              <i-tabler name="refresh" class="me-1" size="16"></i-tabler>
              รีเซ็ตค่าเริ่มต้น
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
    { value: 'vertical', label: 'แนวตั้ง' },
    { value: 'fluid', label: 'เต็มจอ' },
    { value: 'boxed', label: 'Boxed' },
    { value: 'condensed', label: 'Condensed' },
  ];
  colorSchemes = [
    { value: 'blue', label: 'น้ำเงิน' },
    { value: 'azure', label: 'ฟ้า' },
    { value: 'indigo', label: 'คราม' },
    { value: 'purple', label: 'ม่วง' },
    { value: 'pink', label: 'ชมพู' },
    { value: 'red', label: 'แดง' },
    { value: 'orange', label: 'ส้ม' },
    { value: 'yellow', label: 'เหลือง' },
    { value: 'lime', label: 'เขียวอ่อน' },
    { value: 'green', label: 'เขียว' },
    { value: 'teal', label: 'เขียวน้ำเงิน' },
    { value: 'cyan', label: 'ฟ้าอ่อน' },
  ];
  fontFamilies = [
    { value: 'sans-serif', label: 'Sans-serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'comic', label: 'Comic' },
  ];
  themeBases = [
    { value: 'slate', label: 'Slate' },
    { value: 'gray', label: 'Gray' },
    { value: 'zinc', label: 'Zinc' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'stone', label: 'Stone' },
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
