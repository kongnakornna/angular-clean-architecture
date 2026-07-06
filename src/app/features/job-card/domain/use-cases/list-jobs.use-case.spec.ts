import { of } from 'rxjs';
import { ListJobsUseCase } from './list-jobs.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('ListJobsUseCase', () => {
  let useCase: ListJobsUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['list']);
    useCase = new ListJobsUseCase(mockRepo);
  });

  it('should list job cards without params', () => {
    const expected = { data: [], total: 0 };
    mockRepo.list.and.returnValue(of(expected));

    useCase.execute().subscribe((result) => {
      expect(result.total).toBe(0);
      expect(mockRepo.list).toHaveBeenCalledWith(undefined);
    });
  });

  it('should list job cards with filter params', () => {
    const params = { status: 'pending', priority: 'high', search: 'test', page: 1, pageSize: 10 };
    const expected = { data: [], total: 0 };
    mockRepo.list.and.returnValue(of(expected));

    useCase.execute(params).subscribe((result) => {
      expect(result.total).toBe(0);
      expect(mockRepo.list).toHaveBeenCalledWith(params);
    });
  });
});
