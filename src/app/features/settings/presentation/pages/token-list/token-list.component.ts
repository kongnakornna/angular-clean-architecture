import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListTokensUseCase } from '../../../domain/use-cases/list-tokens.use-case';
import { RevokeTokenUseCase } from '../../../domain/use-cases/revoke-token.use-case';
import { Token } from '../../../domain/entities/token.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-token-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss'],
})
export class TokenListComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<Token[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  searchTerm = '';

  constructor(
    private listUseCase: ListTokensUseCase,
    private revokeUseCase: RevokeTokenUseCase,
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

  revokeToken(id: string): void {
    if (!confirm('Are you sure you want to revoke this token?')) return;
    this.revokeUseCase.execute(id).subscribe({
      next: () => this.loadItems(),
    });
  }
}
