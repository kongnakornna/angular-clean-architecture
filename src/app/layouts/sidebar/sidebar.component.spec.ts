import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SidebarComponent } from './sidebar.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslatePipe],
      declarations: [SidebarComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should toggle submenu', () => {
    component.toggleSubmenu('ระบบ');
    expect(component.isExpanded('ระบบ')).toBeTrue();
    component.toggleSubmenu('ระบบ');
    expect(component.isExpanded('ระบบ')).toBeFalse();
  });
});
