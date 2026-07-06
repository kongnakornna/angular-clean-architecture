import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgIf, NgFor, TablerIconComponent],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">เลือกภาษา</h2>
      <div class="text-secondary mt-1">เปลี่ยนภาษาที่แสดงผลในระบบ</div>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="list-group">
      <div class="list-group-item d-flex align-items-center" *ngFor="let lang of languages" (click)="selectLanguage(lang.code)" style="cursor:pointer" [class.active]="lang.code === activeLang">
        <i-tabler [name]="lang.icon" class="icon me-3"></i-tabler>
        <div class="flex-fill">
          <div class="fw-bold">{{ lang.name }}</div>
          <div class="text-secondary">{{ lang.nativeName }}</div>
        </div>
        <div *ngIf="lang.code === activeLang">
          <span class="badge bg-primary">กำลังใช้</span>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
})
export class LanguageSelectorComponent {
  activeLang = 'th';
  languages = [
    { code: 'th', name: 'ไทย', nativeName: 'ภาษาไทย', icon: 'language' },
    { code: 'en', name: 'English', nativeName: 'English', icon: 'language' },
    { code: 'ja', name: '日本語', nativeName: '日本語', icon: 'language' },
    { code: 'zh', name: '中文', nativeName: '中文', icon: 'language' },
  ];

  selectLanguage(code: string): void {
    this.activeLang = code;
  }
}
