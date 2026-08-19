import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateHostUseCase } from '../../../domain/use-cases/create-host.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-host-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './host-create.component.html',
})
export class HostCreateComponent {
  name = '';
  ipAddress = '';
  port = 80;
  type = '';
  status = true;

  constructor(
    private createUseCase: CreateHostUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      ipAddress: this.ipAddress,
      port: this.port,
      type: this.type,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/host']),
    });
  }
}
