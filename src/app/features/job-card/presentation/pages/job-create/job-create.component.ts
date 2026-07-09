import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, TranslatePipe],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">{{ 'jobCard.createTitle' | translate }}</h2>
      <div class="text-secondary mt-1">{{ 'jobCard.createSubtitle' | translate }}</div>
    </div>
    <div class="col-auto ms-auto d-print-none">
      <a routerLink="/jobs" class="btn btn-outline-secondary">{{ 'jobCard.back' | translate }}</a>
    </div>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <form>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">{{ 'jobCard.customer' | translate }}</label>
          <select class="form-select" name="customerId" [(ngModel)]="customerId">
            <option value="1">บริษัท อิคมอน จำกัด</option>
            <option value="2">บริษัท A จำกัด</option>
            <option value="3">บริษัท B จำกัด</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">{{ 'jobCard.device' | translate }}</label>
          <input type="text" class="form-control" name="device" [(ngModel)]="device" placeholder="{{ 'jobCard.devicePlaceholder' | translate }}">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">{{ 'jobCard.problem' | translate }}</label>
        <textarea class="form-control" name="problem" [(ngModel)]="problem" rows="4" placeholder="{{ 'jobCard.problemPlaceholder' | translate }}"></textarea>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-4">
          <label class="form-label">{{ 'jobCard.priority' | translate }}</label>
          <select class="form-select" name="priority" [(ngModel)]="priority">
            <option value="low">ต่ำ</option>
            <option value="medium">ปานกลาง</option>
            <option value="high">สูง</option>
            <option value="urgent">เร่งด่วน</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">{{ 'jobCard.appointmentDate' | translate }}</label>
          <input type="date" class="form-control" name="scheduledDate" [(ngModel)]="scheduledDate">
        </div>
        <div class="col-md-4">
          <label class="form-label">{{ 'jobCard.assignee' | translate }}</label>
          <select class="form-select" name="assignedTo" [(ngModel)]="assignedTo">
            <option value="สมชาย">สมชาย</option>
            <option value="กนก">กนก</option>
            <option value="วิชัย">วิชัย</option>
          </select>
        </div>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary">{{ 'jobCard.create' | translate }}</button>
      </div>
    </form>
  </div>
</div>
  `,
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent {
  customerId = '';
  device = '';
  problem = '';
  priority = 'medium';
  scheduledDate = '';
  assignedTo = '';
}
