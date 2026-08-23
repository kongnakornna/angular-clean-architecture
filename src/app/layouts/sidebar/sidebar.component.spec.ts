import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SidebarComponent } from './sidebar.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { PermissionService } from '../../core/services/permission.service';
import { MENU_CONFIG } from '../../core/config/menu.config';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockPermissionService = {
    loadPermissions: () => of([]),
    hasPermission: () => of(true),
    filterByPermission: (items: any[], keyFn: (item: any) => string) => of(items),
    refreshPermissions: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslatePipe],
      declarations: [SidebarComponent],
      providers: [
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: PermissionService, useValue: mockPermissionService },
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
