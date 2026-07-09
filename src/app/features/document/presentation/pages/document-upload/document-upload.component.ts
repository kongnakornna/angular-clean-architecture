import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'document.uploadTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'document.uploadSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/documents" class="btn btn-outline-secondary">{{ 'document.back' | translate }}</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="dropzone" style="border:2px dashed var(--tblr-border-color);border-radius:8px;padding:60px 20px;text-align:center;cursor:pointer">
      <i-tabler name="upload" style="width:48px;height:48px;stroke:var(--tblr-secondary)" class="mb-3"></i-tabler>
      <h3>{{ 'document.dragAndDrop' | translate }}</h3>
      <div class="text-secondary mb-3">{{ 'document.or' | translate }}</div>
      <button class="btn btn-primary">{{ 'document.browseFiles' | translate }}</button>
      <div class="text-secondary mt-2">{{ 'document.supportedFormats' | translate }}</div>
    </div>
    <div class="mt-3" *ngIf="selectedFile">
      <div class="alert alert-info">{{ selectedFile }}</div>
    </div>
    <form class="mt-3">
      <div class="mb-3">
        <label class="form-label">{{ 'document.category' | translate }}</label>
        <select class="form-select" name="category" [(ngModel)]="category">
          <option value="report">{{ 'document.categoryReport' | translate }}</option>
          <option value="invoice">{{ 'document.categoryInvoice' | translate }}</option>
          <option value="contract">{{ 'document.categoryContract' | translate }}</option>
          <option value="other">{{ 'document.categoryOther' | translate }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'document.note' | translate }}</label>
        <textarea class="form-control" name="notes" [(ngModel)]="notes" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">{{ 'document.upload' | translate }}</button>
    </form>
  </div>
</div>
  `,
  styleUrls: ['./document-upload.component.scss'],
})
export class DocumentUploadComponent {
  selectedFile = '';
  category = 'report';
  notes = '';
}
