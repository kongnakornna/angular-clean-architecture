import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">เทมเพลตอีเมล</h2>
          <div class="text-muted mt-1">จัดการเทมเพลตอีเมล</div>
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
export class EmailTemplatesComponent {}
