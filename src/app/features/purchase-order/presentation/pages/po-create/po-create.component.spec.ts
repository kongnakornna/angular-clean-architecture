import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { POCreateComponent } from './po-create.component';

describe('POCreateComponent', () => {
  let component: POCreateComponent;
  let fixture: ComponentFixture<POCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POCreateComponent, RouterTestingModule, DecimalPipe],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(POCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
