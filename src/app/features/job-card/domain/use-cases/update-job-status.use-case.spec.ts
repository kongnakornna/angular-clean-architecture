import { of } from 'rxjs';
import { UpdateJobStatusUseCase } from './update-job-status.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('UpdateJobStatusUseCase', () => {
  let useCase: UpdateJobStatusUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['updateStatus']);
    useCase = new UpdateJobStatusUseCase(mockRepo);
  });

  it('should update job card status', () => {
    const expected: any = { id: '1', status: 'in_progress' };
    mockRepo.updateStatus.and.returnValue(of(expected));

    useCase.execute('1', 'in_progress').subscribe((job) => {
      expect(job.status).toBe('in_progress');
      expect(mockRepo.updateStatus).toHaveBeenCalledWith('1', 'in_progress');
    });
  });
});
