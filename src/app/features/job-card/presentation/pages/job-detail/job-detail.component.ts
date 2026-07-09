import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'jobCard.detailTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ job.jobNumber }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/jobs" class="btn btn-outline-secondary me-2">{{ 'jobCard.back' | translate }}</a>
      <a routerLink="/jobs/1/edit" class="btn btn-primary">{{ 'jobCard.edit' | translate }}</a>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'jobCard.jobInfo' | translate }}</h3></div>
      <div class="card-body">
        <div class="datagrid">
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.jobNumber' | translate }}</div>
            <div class="datagrid-content">{{ job.jobNumber }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.customer' | translate }}</div>
            <div class="datagrid-content">{{ job.customer }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.device' | translate }}</div>
            <div class="datagrid-content">{{ job.device }}</div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.status' | translate }}</div>
            <div class="datagrid-content">
              <span class="badge bg-blue">{{ job.status }}</span>
            </div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.priority' | translate }}</div>
            <div class="datagrid-content">
              <span class="badge bg-red">{{ job.priority }}</span>
            </div>
          </div>
          <div class="datagrid-item">
            <div class="datagrid-title">{{ 'jobCard.assignee' | translate }}</div>
            <div class="datagrid-content">{{ job.assignedTo }}</div>
          </div>
        </div>
        <div class="mt-3">
          <h4>{{ 'jobCard.problemDetail' | translate }}</h4>
          <p>{{ job.problem }}</p>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header"><h3 class="card-title">{{ 'jobCard.attachments' | translate }}</h3></div>
      <div class="card-body">
        <div class="mb-2" *ngFor="let f of attachments">
          <div class="d-flex align-items-center">
            <i-tabler name="file" class="icon me-2"></i-tabler>
            <span>{{ f.name }}</span>
            <span class="text-secondary ms-2">({{ f.size }})</span>
          </div>
        </div>
        <div *ngIf="attachments.length === 0" class="text-secondary py-2">{{ 'jobCard.noAttachments' | translate }}</div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header"><h3 class="card-title">{{ 'jobCard.timeline' | translate }}</h3></div>
      <div class="card-body">
        <ul class="steps steps-vertical">
          <li class="step-item" *ngFor="let t of timeline">
            <div class="h4 m-0">{{ t.action }}</div>
            <div class="text-secondary">{{ t.user }} - {{ t.time }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  job = { jobNumber: 'JC-2026-001', customer: 'บริษัท อิคมอน จำกัด', device: 'PC-001', status: 'กำลังดำเนินการ', priority: 'เร่งด่วน', assignedTo: 'สมชาย ใจดี', problem: 'เครื่องไม่สามารถเปิดเครื่องได้ มีเสียงเตือน และจอไม่ติด' };
  attachments = [
    { name: 'รูปภาพเครื่อง.jpg', size: '2.1 MB' },
    { name: 'รายงานการตรวจสอบเบื้องต้น.pdf', size: '1.5 MB' },
  ];
  timeline = [
    { action: 'สร้างงาน', user: 'สมชาย', time: '01/04/2026 09:00' },
    { action: 'มอบหมายงาน', user: 'ผู้จัดการ', time: '01/04/2026 09:30' },
    { action: 'เริ่มดำเนินการ', user: 'สมชาย', time: '01/04/2026 10:00' },
    { action: 'อัปเดตความคืบหน้า', user: 'สมชาย', time: '01/04/2026 14:00' },
  ];
}
