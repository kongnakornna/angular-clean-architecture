import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ListJobsUseCase } from '../../../domain/use-cases/list-jobs.use-case';
import { JobCard } from '../../../domain/entities/job-card.entity';
import { Helpers } from '../../../../../core/utils/helpers';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {

  private jobsSubject = new BehaviorSubject<JobCard[]>([]);
  jobs$ = this.jobsSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';

  getStatusColor = (s: string) => Helpers.getStatusColor(s);
  getStatusLabel = (s: string) => Helpers.getStatusLabel(s);
  getPriorityLabel = (s: string) => Helpers.getPriorityLabel(s);

  constructor(private listJobsUseCase: ListJobsUseCase) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loadingSubject.next(true);
    const params: any = { page: this.currentPage, pageSize: this.pageSize };
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.statusFilter) params.status = this.statusFilter;
    if (this.priorityFilter) params.priority = this.priorityFilter;
    this.listJobsUseCase.execute(params).subscribe({
      next: (res) => { this.jobsSubject.next(res.data); this.totalSubject.next(res.total); this.loadingSubject.next(false); },
      error: () => this.loadingSubject.next(false),
    });
  }

  search(): void {
    this.currentPage = 1;
    this.loadJobs();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.currentPage = 1;
    this.loadJobs();
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.loadJobs(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) { this.currentPage++; this.loadJobs(); }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadJobs();
  }

  totalPages(): number {
    return Math.ceil(this.totalSubject.getValue() / this.pageSize) || 1;
  }

  pageNumbers(): (number | string)[] {
    const total = this.totalPages();
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const current = this.currentPage;
    const pages: (number | string)[] = [1];
    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(total - 1, current + 1);
    if (rangeStart > 2) pages.push('...');
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < total - 1) pages.push('...');
    pages.push(total);
    return pages;
  }
}
