import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateScheduleUseCase } from '../../../domain/use-cases/create-schedule.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

declare var Swal: any;

@Component({
  selector: 'app-schedule-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
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
    if (!this.validate()) return;

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
      next: () => {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Create Successful',
            text: 'New schedule has been created',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => this.router.navigate(['/settings/schedule']));
        } else {
          this.router.navigate(['/settings/schedule']);
        }
      },
      error: (err) => {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Create Failed',
            text: err?.error?.message || 'Unknown error',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      },
    });
  }

  private validate(): boolean {
    const msgs: string[] = [];
    if (!this.name.trim()) msgs.push('Please enter schedule name');
    if (!this.startTime) msgs.push('Please enter start time');
    const days = [this.sunday, this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday];
    if (!days.some(d => d)) msgs.push('Please select at least 1 day');

    if (msgs.length) {
      if (typeof Swal !== 'undefined') {
        Swal.fire({ icon: 'warning', title: 'Invalid Input', html: msgs.join('<br>'), timer: 1500, showConfirmButton: false });
      }
      return false;
    }
    return true;
  }
}
