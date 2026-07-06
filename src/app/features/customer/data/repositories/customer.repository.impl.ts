import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerApiDataSource } from '../datasources/customer.api.datasource';

@Injectable({ providedIn: 'root' })
export class CustomerRepositoryImpl implements ICustomerRepository {
  constructor(private dataSource: CustomerApiDataSource) {}

  list(params?: any): Observable<{ data: Customer[]; total: number }> {
    return this.dataSource.list(params).pipe(
      map((res) => ({ data: res.data.map((dto: any) => this.mapToEntity(dto)), total: res.total }))
    );
  }

  getById(id: string): Observable<Customer> {
    return this.dataSource.getById(id).pipe(map((dto) => this.mapToEntity(dto)));
  }

  create(customer: Partial<Customer>): Observable<Customer> {
    return this.dataSource.create(customer).pipe(map((dto) => this.mapToEntity(dto)));
  }

  update(id: string, customer: Partial<Customer>): Observable<Customer> {
    return this.dataSource.update(id, customer).pipe(map((dto) => this.mapToEntity(dto)));
  }

  delete(id: string): Observable<void> {
    return this.dataSource.delete(id);
  }

  search(query: string): Observable<Customer[]> {
    return this.dataSource.search(query).pipe(map((dtoList) => dtoList.map((dto) => this.mapToEntity(dto))));
  }

  private mapToEntity(dto: any): Customer {
    return {
      id: dto.id,
      code: dto.code,
      companyName: dto.companyName,
      taxId: dto.taxId,
      phone: dto.phone,
      email: dto.email,
      address: dto.address,
      province: dto.province,
      district: dto.district,
      postalCode: dto.postalCode,
      contacts: dto.contacts || [],
      notes: dto.notes,
      isActive: dto.isActive,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
