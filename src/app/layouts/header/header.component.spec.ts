import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslatePipe],
      declarations: [HeaderComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 notifications', () => {
    expect(component.notifications.length).toBe(3);
  });

  it('should emit toggleSidebar on onToggle', () => {
    spyOn(component.toggleSidebar, 'emit');
    component.onToggle();
    expect(component.toggleSidebar.emit).toHaveBeenCalled();
  });
});
