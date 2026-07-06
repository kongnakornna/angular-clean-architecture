import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from './components/buttons/primary-button.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { StatusLabelPipe } from './pipes/status-label.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    PrimaryButtonComponent,
    ConfirmModalComponent,
    TranslatePipe,
    StatusLabelPipe,
    FileSizePipe,
    ClickOutsideDirective,
    ToastComponent,
  ],
  exports: [
    PrimaryButtonComponent,
    ConfirmModalComponent,
    TranslatePipe,
    StatusLabelPipe,
    FileSizePipe,
    ClickOutsideDirective,
    ToastComponent,
  ],
})
export class SharedModule {}
