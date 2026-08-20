import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TablerIconComponent } from 'angular-tabler-icons';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, TablerIconComponent, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'jobCard.boardTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'jobCard.boardSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/jobs/create" class="btn btn-primary">{{ 'jobCard.create' | translate }}</a>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-4" *ngFor="let col of columns">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ col.title }}</h3>
        <span class="badge bg-secondary ms-2">{{ col.jobs.length }}</span>
      </div>
      <div class="card-body">
        <div class="mb-3" *ngFor="let job of col.jobs">
          <div class="card card-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span class="badge" [class.bg-red]="job.priority === 'urgent'" [class.bg-yellow]="job.priority === 'high'" [class.bg-blue]="job.priority === 'medium'" [class.bg-secondary]="job.priority === 'low'">{{ job.priority }}</span>
                <span class="text-secondary">{{ job.jobNumber }}</span>
              </div>
              <h4 class="card-title mb-1"><a [routerLink]="['/jobs', job.id]">{{ job.title }}</a></h4>
              <div class="text-secondary mb-2">{{ job.customer }}</div>
              <div class="d-flex align-items-center">
                <span class="avatar avatar-xs me-2">{{ job.assignedTo[0] }}</span>
                <span class="text-secondary">{{ job.assignedTo }}</span>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="col.jobs.length === 0" class="text-center text-secondary py-4">
          <div class="mb-2"><i-tabler name="inbox" class="icon"></i-tabler></div>
          {{ 'jobCard.noJobsInColumn' | translate }}
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./job-board.component.scss'],
})
export class JobBoardComponent {
  columns = [
    {
      title: 'รอดำเนินการ',
      status: 'pending',
      jobs: [
        { id: 3, jobNumber: 'JC-2026-003', title: 'ซ่อมเครื่องพิมพ์ Canon', customer: 'บริษัท A', priority: 'medium', assignedTo: 'สมชาย' },
        { id: 4, jobNumber: 'JC-2026-004', title: 'ติดตั้งระบบ LAN', customer: 'บริษัท B', priority: 'high', assignedTo: 'วิชัย' },
      ],
    },
    {
      title: 'กำลังดำเนินการ',
      status: 'in_progress',
      jobs: [
        { id: 1, jobNumber: 'JC-2026-001', title: 'ซ่อมคอมพิวเตอร์ PC-001', customer: 'บริษัท อิคมอน', priority: 'urgent', assignedTo: 'สมชาย' },
        { id: 2, jobNumber: 'JC-2026-002', title: 'เปลี่ยนฮาร์ดดิสก์ Server', customer: 'บริษัท C', priority: 'high', assignedTo: 'กนก' },
      ],
    },
    {
      title: 'เสร็จสิ้น',
      status: 'completed',
      jobs: [
        { id: 5, jobNumber: 'JC-2026-005', title: 'ติดตั้งกล้องวงจรปิด', customer: 'บริษัท D', priority: 'low', assignedTo: 'นิด' },
      ],
    },
  ];
}
