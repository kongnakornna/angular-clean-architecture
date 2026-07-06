import { of } from 'rxjs';
import { UpdateJobUseCase } from './update-job.use-case';
import { IJobCardRepository } from '../repositories/job-card.repository';

describe('UpdateJobUseCase', () => {
  let useCase: UpdateJobUseCase;
  let mockRepo: jasmine.SpyObj<IJobCardRepository>;

  beforeEach(() => {
    mockRepo = jasmine.createSpyObj('IJobCardRepository', ['update']);
    useCase = new UpdateJobUseCase(mockRepo);
  });

  it('should update a job card', () => {
    const updateData = { title: 'Updated Title' };
    const expected: any = { id: '1', title: 'Updated Title' };
    mockRepo.update.and.returnValue(of(expected));

    useCase.execute('1', updateData).subscribe((job) => {
      expect(job.title).toBe('Updated Title');
      expect(mockRepo.update).toHaveBeenCalledWith('1', updateData);
    });
  });
});
