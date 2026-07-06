import { of } from 'rxjs';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { ICustomerRepository } from '../repositories/customer.repository';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let mockRepo: jasmine.SpyObj<ICustomerRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('ICustomerRepository', ['create']);
    useCase = new CreateCustomerUseCase(mockRepo);
  });

  it('should create a customer', () => {
    const customerData = { companyName: 'Test Company', phone: '0812345678', email: 'test@test.com' };
    const expectedCustomer: any = {
      id: '1', code: 'CUS-001', companyName: 'Test Company', phone: '0812345678', email: 'test@test.com',
      address: '', province: '', district: '', postalCode: '',
      contacts: [], isActive: true, createdAt: new Date(), updatedAt: new Date(),
    };
    mockRepo.create.and.returnValue(of(expectedCustomer));

    useCase.execute(customerData).subscribe((customer) => {
      expect(customer.code).toBe('CUS-001');
      expect(mockRepo.create).toHaveBeenCalledWith(customerData);
    });
  });
});
