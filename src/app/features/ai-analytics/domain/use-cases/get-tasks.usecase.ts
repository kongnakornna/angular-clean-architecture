import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../../core/contracts/usecase.contract';
import { IAIAnalyticsRepository } from '../repositories/ai-analytics.repository';
import { CommandCenterState } from '../entities/command-center.entity';

@Injectable({ providedIn: 'root' })
export class GetTasksUseCase implements Usecase<void, Observable<CommandCenterState>> {
  constructor(@Inject(IAIAnalyticsRepository) private repo: IAIAnalyticsRepository) {}

  execute(): Observable<CommandCenterState> {
    return this.repo.getCommandCenterState();
  }
}
