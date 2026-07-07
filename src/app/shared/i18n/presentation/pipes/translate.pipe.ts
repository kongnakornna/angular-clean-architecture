import { Pipe, PipeTransform, inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'appTranslate',
  standalone: true,
  pure: false,
})
export class AppTranslatePipe implements PipeTransform, OnDestroy {
  private translate = inject(TranslateService);
  private langChangeSubscription: Subscription;

  private value = '';
  private lastKey = '';

  constructor() {
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      if (this.lastKey) {
        this.value = this.translate.instant(this.lastKey);
      }
    });
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.value = this.translate.instant(key);
    }
    return this.value;
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }
}