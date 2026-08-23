import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() visible = false;
  @Input() title = 'common.confirm';
  @Input() message = 'common.confirmMessage';
  @Input() confirmText = 'common.confirm';
  @Input() cancelText = 'common.cancel';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
