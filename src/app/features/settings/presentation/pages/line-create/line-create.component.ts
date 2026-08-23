import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLineNotificationUseCase } from '../../../domain/use-cases/create-line-notification.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-line-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './line-create.component.html',
})
export class LineCreateComponent {
  name = '';
  channelAccessToken = '';
  userId = '';
  status = true;

  constructor(
    private createUseCase: CreateLineNotificationUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      channelAccessToken: this.channelAccessToken,
      userId: this.userId,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/line']),
    });
  }
}
