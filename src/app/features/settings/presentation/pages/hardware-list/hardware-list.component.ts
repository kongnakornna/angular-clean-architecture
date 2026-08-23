import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListHardwareUseCase } from '../../../domain/use-cases/list-hardware.use-case';
import { DeleteHardwareUseCase } from '../../../domain/use-cases/delete-hardware.use-case';
import { Hardware } from '../../../domain/entities/hardware.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hardware-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss'],
})
export class HardwareListComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<Hardware[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  searchTerm = '';

  constructor(
    private listUseCase: ListHardwareUseCase,
    private deleteUseCase: DeleteHardwareUseCase,
  ) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void {
    this.loadingSubject.next(true);
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    this.listUseCase.execute(params).subscribe({
      next: (res) => { this.itemsSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  search(): void { this.loadItems(); }

  deleteItem(id: string): void {
    if (!confirm('Are you sure?')) return;
    this.deleteUseCase.execute(id).subscribe({
      next: () => this.loadItems(),
    });
  }
}
