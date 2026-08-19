import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateSensorUseCase } from '../../../domain/use-cases/create-sensor.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sensor-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './sensor-create.component.html',
})
export class SensorCreateComponent {
  name = '';
  type = '';
  unit = '';
  minThreshold = 0;
  maxThreshold = 100;
  status = true;

  constructor(
    private createUseCase: CreateSensorUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      type: this.type,
      unit: this.unit,
      minThreshold: this.minThreshold,
      maxThreshold: this.maxThreshold,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/sensors']),
    });
  }
}
