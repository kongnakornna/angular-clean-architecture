import { Observable } from 'rxjs';
import { ContextProviderService } from '../../data/services/context-provider.service';

export class GetContextUseCase {
  constructor(private contextProvider: ContextProviderService) {}

  execute(contextTypes: string[]): Observable<string> {
    return this.contextProvider.getContext(contextTypes);
  }
}
