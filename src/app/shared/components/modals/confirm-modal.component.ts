import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  template: `
    <div class="modal" [class.show]="visible" [style.display]="visible ? 'block' : 'none'">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="onCancel.emit()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" (click)="onCancel.emit()">{{ cancelText }}</button>
            <button class="btn btn-danger" (click)="onConfirm.emit()">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="visible"></div>
  `,
})
export class ConfirmModalComponent {
  @Input() visible = false;
  @Input() title = 'ยืนยัน';
  @Input() message = 'คุณต้องการดำเนินการนี้หรือไม่?';
  @Input() confirmText = 'ยืนยัน';
  @Input() cancelText = 'ยกเลิก';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
