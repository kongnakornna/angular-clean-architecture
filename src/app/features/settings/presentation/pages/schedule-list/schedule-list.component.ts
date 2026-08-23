import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListSchedulesUseCase } from '../../../domain/use-cases/list-schedules.use-case';
import { DeleteScheduleUseCase } from '../../../domain/use-cases/delete-schedule.use-case';
import { ScheduleApiDataSource } from '../../../data/datasources/schedule.api.datasource';
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
    private dataSource: ScheduleApiDataSource,
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

  toggleDayStatus(scheduleId: string, field: string, currentValue: boolean): void {
    const newValue = currentValue ? 0 : 1;
    this.dataSource.updateDayStatus(scheduleId, field, newValue).subscribe({
      next: (res: any) => {
        if (res.code === 200 || res.success) {
          const items = this.itemsSubject.value.map(item => {
            if (item.id === scheduleId) {
              return { ...item, [field]: !!newValue } as Schedule;
            }
            return item;
          });
          this.itemsSubject.next(items);
        } else {
          this.loadItems();
        }
      },
      error: () => this.loadItems(),
    });
  }

  toggleAllStatus(field: string, checkAll: boolean): void {
    const items = this.itemsSubject.value;
    if (!items.length) return;
    const value = checkAll ? 1 : 0;
    const action = checkAll ? 'check' : 'uncheck';

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} All Status`,
        text: `Are you sure you want to ${action} ${items.length} items?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `${action.charAt(0).toUpperCase() + action.slice(1)} All`,
        cancelButtonText: 'Cancel',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.executeUpdateAll(items, field, value);
        }
      });
    } else {
      this.executeUpdateAll(items, field, value);
    }
  }

  private async executeUpdateAll(items: Schedule[], field: string, value: number): Promise<void> {
    if (typeof Swal !== 'undefined') {
      Swal.fire({ title: 'Processing...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    }
    let successCount = 0;
    for (const item of items) {
      try {
        const res: any = await this.dataSource.updateDayStatus(item.id, field, value).toPromise();
        if (res.code === 200 || res.success) successCount++;
      } catch { /* skip */ }
    }
    if (typeof Swal !== 'undefined') {
      Swal.close();
      Swal.fire({
        icon: successCount === items.length ? 'success' : 'warning',
        title: 'Completed',
        text: `Successfully updated ${successCount}/${items.length} items`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
    this.loadItems();
  }
}
