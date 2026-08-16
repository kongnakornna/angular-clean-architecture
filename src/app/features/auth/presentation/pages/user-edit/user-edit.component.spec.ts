import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UserEditComponent } from './user-edit.component';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconLogout } from 'angular-tabler-icons/icons';
import { AUTH_REPOSITORY } from '../../../../../core/di/tokens';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserEditComponent,
        RouterTestingModule.withRoutes([{ path: 'users/:id/edit', component: UserEditComponent }]),
      ],
      providers: [
        provideTablerIcons({ IconLogout }),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        {
          provide: AUTH_REPOSITORY,
          useValue: {
            getUserById: (id: string) => of({ id, username: 'testuser', email: 'test@test.local', fullName: 'Test User', status: '1', roleId: 1 }),
            updateUser: (id: string, data: any) => of({ id, ...data }),
            updateUserRole: (id: string, roleId: number) => of(undefined),
            updateUserPassword: (id: string, o: string, n: string, c: string) => of(undefined),
            forceLogoutUser: (id: string) => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    component.userId = 'test-id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
