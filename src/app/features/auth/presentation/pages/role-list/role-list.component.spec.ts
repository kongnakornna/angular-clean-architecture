import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleListComponent } from './role-list.component';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconPlus, IconPencil } from 'angular-tabler-icons/icons';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleListComponent],
      providers: [
        provideTablerIcons({ IconPlus, IconPencil }),
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
