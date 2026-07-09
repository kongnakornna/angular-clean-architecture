import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from './page-header.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePipe],
      declarations: [PageHeaderComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'test.title';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.page-title');
    expect(el.textContent).toContain('test.title');
  });

  it('should display pretitle when provided', () => {
    component.pretitle = 'test.pretitle';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.page-pretitle');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('test.pretitle');
  });

  it('should not show pretitle when empty', () => {
    component.pretitle = '';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.page-pretitle');
    expect(el).toBeFalsy();
  });

  it('should display description when provided', () => {
    component.description = 'test.description';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.text-secondary');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('test.description');
  });

  it('should not show description when empty', () => {
    component.description = '';
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.text-secondary');
    expect(el).toBeFalsy();
  });
});
