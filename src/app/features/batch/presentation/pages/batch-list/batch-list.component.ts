import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">Batch Jobs</h2>
          <div class="text-muted mt-1">จัดการงานที่ทำงานตามกำหนดเวลา</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body text-center text-muted py-5">
        <p>กำลังพัฒนาระบบ...</p>
      </div>
    </div>
  `,
})
export class BatchListComponent {}
