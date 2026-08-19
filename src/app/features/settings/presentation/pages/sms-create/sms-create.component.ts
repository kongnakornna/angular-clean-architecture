import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateSmsNotificationUseCase } from '../../../domain/use-cases/create-sms-notification.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sms-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './sms-create.component.html',
})
export class SmsCreateComponent {
  name = '';
  gatewayUrl = '';
  apiKey = '';
  phone = '';
  status = true;

  constructor(
    private createUseCase: CreateSmsNotificationUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      gatewayUrl: this.gatewayUrl,
      apiKey: this.apiKey,
      phone: this.phone,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/sms']),
    });
  }
}
