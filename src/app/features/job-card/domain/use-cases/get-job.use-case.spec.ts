import { of } from 'rxjs';
import { GetJobUseCase } from './get-job.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('GetJobUseCase', () => {
  let useCase: GetJobUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['getById']);
    useCase = new GetJobUseCase(mockRepo);
  });

  it('should get a job card by id', () => {
    const expected: any = { id: '1', title: 'Test Job' };
    mockRepo.getById.and.returnValue(of(expected));

    useCase.execute('1').subscribe((job) => {
      expect(job.id).toBe('1');
      expect(mockRepo.getById).toHaveBeenCalledWith('1');
    });
  });
});
