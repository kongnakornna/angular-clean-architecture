import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIoTRepository } from '../repositories/iot.repository';
import { IOT_REPOSITORY } from '../../../../core/di/tokens';
import { TopicData } from '../entities/device.entity';

@Injectable({ providedIn: 'root' })
export class GetTopicDataUseCase {
  constructor(@Inject(IOT_REPOSITORY) private repo: IIoTRepository) {}

  execute(topic: string, delcache?: string): Observable<TopicData> {
    return this.repo.getTopicData(topic, delcache);
  }
}
