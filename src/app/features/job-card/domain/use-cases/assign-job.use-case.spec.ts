import { of } from 'rxjs';
import { AssignJobUseCase } from './assign-job.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('AssignJobUseCase', () => {
  let useCase: AssignJobUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['assign']);
    useCase = new AssignJobUseCase(mockRepo);
  });

  it('should assign a job card to a user', () => {
    const expected: any = { id: '1', assignedTo: 'user-123' };
    mockRepo.assign.and.returnValue(of(expected));

    useCase.execute('1', 'user-123').subscribe((job) => {
      expect(job.assignedTo).toBe('user-123');
      expect(mockRepo.assign).toHaveBeenCalledWith('1', 'user-123');
    });
  });
});
