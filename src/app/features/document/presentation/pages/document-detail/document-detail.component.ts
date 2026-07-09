import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [NgIf, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'document.detail' | translate }}</h2>
      <div class="text-secondary mt-1">{{ document.name }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/documents" class="btn btn-outline-secondary me-2">{{ 'document.back' | translate }}</a>
      <button class="btn btn-primary">
        <i-tabler name="download" class="icon"></i-tabler> {{ 'document.download' | translate }}
      </button>
      <button class="btn btn-outline-primary ms-2">
        <i-tabler name="share" class="icon"></i-tabler> {{ 'document.share' | translate }}
      </button>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'document.preview' | translate }}</h3></div>
      <div class="card-body text-center py-5">
        <div class="chart-placeholder" style="height:350px;background:var(--tblr-bg-surface-secondary);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-direction:column">
          <i-tabler name="file" style="width:64px;height:64px;stroke:var(--tblr-secondary)" class="mb-3"></i-tabler>
          <span class="text-secondary">{{ 'document.previewPlaceholder' | translate }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'document.fileInfo' | translate }}</h3></div>
      <div class="card-body">
        <div class="datagrid">
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'document.filename' | translate }}</div>
            <div class="datagrid-content">{{ document.name }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'document.type' | translate }}</div>
            <div class="datagrid-content">{{ document.type }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'document.size' | translate }}</div>
            <div class="datagrid-content">{{ document.size }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'document.uploadedAt' | translate }}</div>
            <div class="datagrid-content">{{ document.uploadedAt }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'document.uploadedBy' | translate }}</div>
            <div class="datagrid-content">{{ document.uploadedBy }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent {
  document = { name: 'รายงาน_Q1_2026.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '01/04/2026 14:30', uploadedBy: 'สมชาย ใจดี' };
}
