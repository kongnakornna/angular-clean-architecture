import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
<div class="page-header d-print-none">
  <div class="row align-items-center">
    <div class="col">
      <h2 class="page-title">วิเคราะห์ข้อมูล</h2>
      <div class="text-secondary mt-1">ภาพรวมและสถิติสำคัญ</div>
    </div>
  </div>
</div>
<div class="row g-3">
  <div class="col-md-3" *ngFor="let stat of stats">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="subheader">{{ stat.label }}</div>
        </div>
        <div class="h1 mb-0">{{ stat.value }}</div>
        <div class="d-flex align-items-baseline">
          <span class="text-green me-1">{{ stat.change }}</span>
          <span class="text-secondary">เทียบกับเดือนก่อน</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="row g-3 mt-2">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header"><h3 class="card-title">ยอดขายรายเดือน</h3></div>
      <div class="card-body">
        <div class="chart-placeholder" style="height:250px;background:var(--tblr-bg-surface-secondary);border-radius:4px;display:flex;align-items:center;justify-content:center">
          <span class="text-secondary">แผนภูมิแสดงยอดขายรายเดือน</span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header"><h3 class="card-title">สัดส่วนงาน</h3></div>
      <div class="card-body">
        <div class="chart-placeholder" style="height:250px;background:var(--tblr-bg-surface-secondary);border-radius:4px;display:flex;align-items:center;justify-content:center">
          <span class="text-secondary">แผนภูมิวงกลม</span>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
})
export class AnalyticsComponent {
  stats = [
    { label: 'รายได้รวม', value: '฿45,230', change: '+12.5%' },
    { label: 'งานทั้งหมด', value: '156', change: '+8.2%' },
    { label: 'ลูกค้าใหม่', value: '23', change: '+5.1%' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
  ];
}
