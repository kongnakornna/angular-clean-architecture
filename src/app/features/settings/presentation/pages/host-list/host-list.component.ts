import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListHostsUseCase } from '../../../domain/use-cases/list-hosts.use-case';
import { Host } from '../../../domain/entities/host.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-host-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss'],
})
export class HostListComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<Host[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  searchTerm = '';

  constructor(private listUseCase: ListHostsUseCase) {}

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
