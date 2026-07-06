import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateJobUseCase } from './create-job.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('CreateJobUseCase', () => {
  let useCase: CreateJobUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['create']);
    TestBed.configureTestingModule({
      providers: [
        CreateJobUseCase,
        { provide: 'IJobCardRepository', useValue: mockRepo },
      ],
    });
    useCase = TestBed.inject(CreateJobUseCase);
    (useCase as any).repo = mockRepo;
  });

  it('should create a job card', () => {
    const jobData = { title: 'Test Job', customerName: 'Test Customer', customerId: '1', deviceType: 'aircon', deviceModel: 'AC-001', problemDescription: 'Not working' };
    const expectedJob: any = {
      id: '1', jobNumber: 'JC-2026-0001', title: 'Test Job', customerName: 'Test Customer',
      customerId: '1', deviceType: 'aircon', deviceModel: 'AC-001', problemDescription: 'Not working',
      status: 'pending', priority: 'medium', partsUsed: [], notes: [], attachments: [],
      createdAt: new Date(), updatedAt: new Date(),
    };
    mockRepo.create.and.returnValue(of(expectedJob));

    useCase.execute(jobData).subscribe((job) => {
      expect(job.jobNumber).toBe('JC-2026-0001');
      expect(mockRepo.create).toHaveBeenCalledWith(jobData);
    });
  });
});
