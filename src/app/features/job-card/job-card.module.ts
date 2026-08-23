import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './presentation/pages/job-list/job-list.component';

const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'board', component: JobListComponent },
  { path: 'create', component: JobListComponent },
  { path: ':id', component: JobListComponent },
  { path: 'edit/:id', component: JobListComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), JobListComponent],
  declarations: [],
})
export class JobCardModule {}
