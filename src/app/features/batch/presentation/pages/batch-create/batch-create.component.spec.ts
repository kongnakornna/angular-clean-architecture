import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { BatchCreateComponent } from './batch-create.component';

describe('BatchCreateComponent', () => {
  let component: BatchCreateComponent;
  let fixture: ComponentFixture<BatchCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchCreateComponent, RouterTestingModule],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BatchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
