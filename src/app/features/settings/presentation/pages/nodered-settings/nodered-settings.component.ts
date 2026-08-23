import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListNodeRedUseCase } from '../../../domain/use-cases/list-nodered.use-case';
import { CreateNodeRedUseCase } from '../../../domain/use-cases/create-nodered.use-case';
import { UpdateNodeRedUseCase } from '../../../domain/use-cases/update-nodered.use-case';
import { NodeRed } from '../../../domain/entities/nodered.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-nodered-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './nodered-settings.component.html',
})
export class NodeRedSettingsComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<NodeRed[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  private testResultSubject = new BehaviorSubject<{ success: boolean; message: string } | null>(null);
  testResult$ = this.testResultSubject.asObservable();
  private testingSubject = new BehaviorSubject<boolean>(false);
  testing$ = this.testingSubject.asObservable();

  editingId = '';
  name = '';
  url = '';
  adminUrl = '';

  constructor(
    private listUseCase: ListNodeRedUseCase,
    private createUseCase: CreateNodeRedUseCase,
    private updateUseCase: UpdateNodeRedUseCase,
  ) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void {
    this.loadingSubject.next(true);
    this.listUseCase.execute().subscribe({
      next: (res) => { this.itemsSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  editItem(item: NodeRed): void {
    this.editingId = item.id;
    this.name = item.name;
    this.url = item.url;
    this.adminUrl = item.adminUrl;
  }

  cancelEdit(): void {
    this.editingId = '';
    this.name = '';
    this.url = '';
    this.adminUrl = '';
  }

  onSubmit(): void {
    const payload = { name: this.name, url: this.url, adminUrl: this.adminUrl };
    if (this.editingId) {
      this.updateUseCase.execute(this.editingId, payload).subscribe({
        next: () => { this.cancelEdit(); this.loadItems(); },
      });
    } else {
      this.createUseCase.execute(payload).subscribe({
        next: () => { this.cancelEdit(); this.loadItems(); },
      });
    }
  }
}
