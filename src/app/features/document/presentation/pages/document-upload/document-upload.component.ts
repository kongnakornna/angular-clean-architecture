import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TablerIconComponent],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">อัปโหลดเอกสาร</h2>
      <div class="text-secondary mt-1">เลือกไฟล์เพื่ออัปโหลดเข้าสู่ระบบ</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/documents" class="btn btn-outline-secondary">กลับ</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <div class="dropzone" style="border:2px dashed var(--tblr-border-color);border-radius:8px;padding:60px 20px;text-align:center;cursor:pointer">
      <i-tabler name="upload" style="width:48px;height:48px;stroke:var(--tblr-secondary)" class="mb-3"></i-tabler>
      <h3>ลากไฟล์มาวางที่นี่</h3>
      <div class="text-secondary mb-3">หรือ</div>
      <button class="btn btn-primary">เลือกไฟล์</button>
      <div class="text-secondary mt-2">รองรับ PDF, JPG, PNG, DOC สูงสุด 10MB</div>
    </div>
    <div class="mt-3" *ngIf="selectedFile">
      <div class="alert alert-info">{{ selectedFile }}</div>
    </div>
    <form class="mt-3">
      <div class="mb-3">
        <label class="form-label">หมวดหมู่</label>
        <select class="form-select" name="category" [(ngModel)]="category">
          <option value="report">รายงาน</option>
          <option value="invoice">ใบแจ้งหนี้</option>
          <option value="contract">สัญญา</option>
          <option value="other">อื่นๆ</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">หมายเหตุ</label>
        <textarea class="form-control" name="notes" [(ngModel)]="notes" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">อัปโหลด</button>
    </form>
  </div>
</div>
  `,
})
export class DocumentUploadComponent {
  selectedFile = '';
  category = 'report';
  notes = '';
}
