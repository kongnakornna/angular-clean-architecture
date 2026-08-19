import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateScheduleUseCase } from '../../../domain/use-cases/create-schedule.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-schedule-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './schedule-create.component.html',
})
export class ScheduleCreateComponent {
  name = '';
  startTime = '';
  event = 'on';
  sunday = false;
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  saturday = false;
  status = true;

  constructor(
    private createUseCase: CreateScheduleUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
      name: this.name,
      startTime: this.startTime,
      event: this.event,
      sunday: this.sunday,
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/schedule']),
    });
  }
}
