import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IJobCardRepository } from '../../domain/repositories/job-card.repository';
import { JobCard } from '../../domain/entities/job-card.entity';
import { JobCardApiDataSource } from '../datasources/job-card.api.datasource';

@Injectable({ providedIn: 'root' })
export class JobCardRepositoryImpl implements IJobCardRepository {
  constructor(private dataSource: JobCardApiDataSource) {}

  list(params?: any): Observable<{ data: JobCard[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({
        data: res.data.map((dto: any) => this.mapToEntity(dto)),
        total: res.total,
      }))
    );
  }

  getById(id: string): Observable<JobCard> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(job: Partial<JobCard>): Observable<JobCard> {
    return this.dataSource.create(job).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, job: Partial<JobCard>): Observable<JobCard> {
    return this.dataSource.update(id, job).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  updateStatus(id: string, status: string): Observable<JobCard> {
    return this.dataSource.updateStatus(id, status).pipe(map((dto) => this.mapToEntity(dto)));
  }

  assign(id: string, userId: string): Observable<JobCard> {
    return this.dataSource.assign(id, userId).pipe(map((dto) => this.mapToEntity(dto)));
  }

  getBoardData(): Observable<{ status: string; jobs: JobCard[] }[]> {
    return this.dataSource.getBoardData().pipe(
      map((dtoList: any[]) =>
        dtoList.map((group) => ({
          status: group.status,
          jobs: group.jobs.map((dto: any) => this.mapToEntity(dto)),
        }))
      )
    );
  }

  private mapToEntity(dto: any): JobCard {
    return {
      id: dto.id,
      jobNumber: dto.jobNumber,
      title: dto.title,
      customerId: dto.customerId,
      customerName: dto.customerName,
      deviceType: dto.deviceType,
      deviceModel: dto.deviceModel,
      serialNumber: dto.serialNumber,
      problemDescription: dto.problemDescription,
      status: dto.status,
      priority: dto.priority,
      assignedTo: dto.assignedTo,
      assignedTeam: dto.assignedTeam,
      estimatedHours: dto.estimatedHours,
      actualHours: dto.actualHours,
      partsUsed: dto.partsUsed || [],
      notes: dto.notes || [],
      attachments: dto.attachments || [],
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      completedAt: dto.completedAt ? new Date(dto.completedAt) : undefined,
    };
  }
}
