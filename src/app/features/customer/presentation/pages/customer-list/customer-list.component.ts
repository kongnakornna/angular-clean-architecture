import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListCustomersUseCase } from '../../../domain/use-cases/list-customers.use-case';
import { Customer } from '../../../domain/entities/customer.entity';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  searchTerm = '';

  constructor(private listCustomersUseCase: ListCustomersUseCase) {}

  ngOnInit(): void { this.loadCustomers(); }

  loadCustomers(): void {
    this.loadingSubject.next(true);
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    this.listCustomersUseCase.execute(params).subscribe({
      next: (res) => { this.customersSubject.next(res.data); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  search(): void { this.loadCustomers(); }
}
