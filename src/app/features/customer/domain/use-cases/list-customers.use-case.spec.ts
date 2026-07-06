import { of } from 'rxjs';
import { ListCustomersUseCase } from './list-customers.use-case';
import { ICustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../entities/customer.entity';

describe('ListCustomersUseCase', () => {
  let useCase: ListCustomersUseCase;
  let mockRepo: jasmine.SpyObj<ICustomerRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('ICustomerRepository', ['list']);
    useCase = new ListCustomersUseCase(mockRepo);
  });

  it('should call repo.list without params', () => {
    const result = { data: [], total: 0 };
    mockRepo.list.and.returnValue(of(result));

    useCase.execute().subscribe((res) => {
      expect(res.total).toBe(0);
      expect(res.data).toEqual([]);
      expect(mockRepo.list).toHaveBeenCalledWith(undefined);
    });
  });

  it('should call repo.list with search and pagination params', () => {
    const customers: Customer[] = [
      {
        id: '1', code: 'C001', companyName: 'Acme Corp', phone: '123', email: 'a@a.com',
        address: 'Addr', province: 'Prov', district: 'Dist', postalCode: '1000',
        contacts: [], isActive: true, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    const params = { search: 'Acme', page: 1, pageSize: 10 };
    mockRepo.list.and.returnValue(of({ data: customers, total: 1 }));

    useCase.execute(params).subscribe((res) => {
      expect(res.data.length).toBe(1);
      expect(res.data[0].companyName).toBe('Acme Corp');
      expect(res.total).toBe(1);
      expect(mockRepo.list).toHaveBeenCalledWith(params);
    });
  });
});
