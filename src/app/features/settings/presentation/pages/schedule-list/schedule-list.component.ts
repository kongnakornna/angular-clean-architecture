import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListSchedulesUseCase } from '../../../domain/use-cases/list-schedules.use-case';
import { DeleteScheduleUseCase } from '../../../domain/use-cases/delete-schedule.use-case';
import { Schedule } from '../../../domain/entities/schedule.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

declare var Swal: any;

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<Schedule[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  searchTerm = '';
  eventFilter = '';

  constructor(
    private listUseCase: ListSchedulesUseCase,
    private deleteUseCase: DeleteScheduleUseCase,
  ) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void {
    this.loadingSubject.next(true);
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.eventFilter) params.event = this.eventFilter;
    this.listUseCase.execute(params).subscribe({
      next: (res) => { this.itemsSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  search(): void { this.loadItems(); }

  deleteItem(id: string, name: string): void {
    if (typeof Swal === 'undefined') {
      if (confirm('Are you sure you want to delete this schedule?')) {
        this.deleteUseCase.execute(id).subscribe({ next: () => this.loadItems() });
      }
      return;
    }
    Swal.fire({
      title: 'Delete Schedule',
      text: `Are you sure you want to delete "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.deleteUseCase.execute(id).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1000, showConfirmButton: false });
            this.loadItems();
          },
        });
      }
    });
  }
}
