import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateHardwareUseCase } from '../../../domain/use-cases/create-hardware.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hardware-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './hardware-create.component.html',
})
export class HardwareCreateComponent {
  title = '';
  typeName = '';
  description = '';
  price = 0;

  constructor(
    private createUseCase: CreateHardwareUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      title: this.title,
      typeName: this.typeName,
      description: this.description,
      price: this.price,
    }).subscribe({
      next: () => this.router.navigate(['/settings/hardware']),
    });
  }
}
