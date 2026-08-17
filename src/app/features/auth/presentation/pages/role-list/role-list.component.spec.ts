import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RoleListComponent } from './role-list.component';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconPlus, IconPencil } from 'angular-tabler-icons/icons';
import { ListRolesUseCase } from '../../../domain/use-cases/list-roles.use-case';
import { DeleteRoleUseCase } from '../../../domain/use-cases/delete-role.use-case';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  const mockListRolesUseCase = {
    execute: () => of([]),
  };

  const mockDeleteRoleUseCase = {
    execute: () => of(void 0),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleListComponent, RouterTestingModule],
      providers: [
        provideTablerIcons({ IconPlus, IconPencil }),
        { provide: TranslateService, useValue: { currentLang: 'en', getCurrentLang: () => 'en', getBrowserLang: () => 'en', instant: (k: string) => k, use: () => of({}), onLangChange: of({}) } },
        { provide: ListRolesUseCase, useValue: mockListRolesUseCase },
        { provide: DeleteRoleUseCase, useValue: mockDeleteRoleUseCase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
