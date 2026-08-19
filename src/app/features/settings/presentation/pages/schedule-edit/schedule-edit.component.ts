import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListSchedulesUseCase } from '../../../domain/use-cases/list-schedules.use-case';
import { UpdateScheduleUseCase } from '../../../domain/use-cases/update-schedule.use-case';
import { Schedule } from '../../../domain/entities/schedule.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-schedule-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './schedule-edit.component.html',
})
export class ScheduleEditComponent implements OnInit {
  id = '';
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
    private route: ActivatedRoute,
    private router: Router,
    private listUseCase: ListSchedulesUseCase,
    private updateUseCase: UpdateScheduleUseCase,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadItem();
  }

  loadItem(): void {
    this.listUseCase.execute({ search: this.id }).subscribe({
      next: (res) => {
        const item = res.data.find((s: Schedule) => s.id === this.id);
        if (item) {
          this.name = item.name;
          this.startTime = item.startTime;
          this.event = item.event;
          this.sunday = item.sunday;
          this.monday = item.monday;
          this.tuesday = item.tuesday;
          this.wednesday = item.wednesday;
          this.thursday = item.thursday;
          this.friday = item.friday;
          this.saturday = item.saturday;
          this.status = item.status;
        }
      },
    });
  }

  onSubmit(): void {
    this.updateUseCase.execute(this.id, {
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
