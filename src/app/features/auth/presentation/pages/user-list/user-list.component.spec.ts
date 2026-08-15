import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconPlus, IconPencil, IconTrash, IconSearch, IconChevronLeft, IconChevronRight } from 'angular-tabler-icons/icons';
import { AUTH_REPOSITORY } from '../../../../../core/di/tokens';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, RouterTestingModule],
      providers: [
        provideTablerIcons({ IconPlus, IconPencil, IconTrash, IconSearch, IconChevronLeft, IconChevronRight }),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        {
          provide: AUTH_REPOSITORY,
          useValue: {
            listUsers: (params?: any) => of({ data: [], total: 0 }),
            deleteUser: (id: string) => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
