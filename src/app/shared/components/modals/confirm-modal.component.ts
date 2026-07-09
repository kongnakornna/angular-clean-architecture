import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
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
