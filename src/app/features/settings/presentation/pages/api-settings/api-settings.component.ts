import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListApiSettingsUseCase } from '../../../domain/use-cases/list-api-settings.use-case';
import { UpdateApiSettingUseCase } from '../../../domain/use-cases/update-api-setting.use-case';
import { ApiSetting } from '../../../domain/entities/api-setting.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-api-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './api-settings.component.html',
})
export class ApiSettingsComponent implements OnInit {
  private itemsSubject = new BehaviorSubject<ApiSetting[]>([]);
  items$ = this.itemsSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  editingId = '';
  name = '';
  endpoint = '';
  method = 'GET';
  headersJson = '{}';
  status = true;

  constructor(
    private listUseCase: ListApiSettingsUseCase,
    private updateUseCase: UpdateApiSettingUseCase,
  ) {}

  ngOnInit(): void { this.loadItems(); }

  loadItems(): void {
    this.loadingSubject.next(true);
    this.listUseCase.execute().subscribe({
      next: (res) => { this.itemsSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  editItem(item: ApiSetting): void {
    this.editingId = item.id;
    this.name = item.name;
    this.endpoint = item.endpoint;
    this.method = item.method;
    this.headersJson = JSON.stringify(item.headers, null, 2);
    this.status = item.status;
  }

  cancelEdit(): void {
    this.editingId = '';
    this.name = '';
    this.endpoint = '';
    this.method = 'GET';
    this.headersJson = '{}';
    this.status = true;
  }

  onSubmit(): void {
    let headers: Record<string, string> = {};
    try {
      headers = JSON.parse(this.headersJson);
    } catch {}

    this.updateUseCase.execute(this.editingId, {
      name: this.name,
      endpoint: this.endpoint,
      method: this.method,
      headers,
      status: this.status,
    }).subscribe({
      next: () => { this.cancelEdit(); this.loadItems(); },
    });
  }
}
