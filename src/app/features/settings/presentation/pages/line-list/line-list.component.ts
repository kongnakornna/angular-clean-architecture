import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListLineNotificationsUseCase } from '../../../domain/use-cases/list-line-notifications.use-case';
import { LineNotification } from '../../../domain/entities/line-notification.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-line-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.scss'],
})
export class LineListComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<LineNotification[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  searchTerm = '';

  constructor(private listUseCase: ListLineNotificationsUseCase) {}

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
}
