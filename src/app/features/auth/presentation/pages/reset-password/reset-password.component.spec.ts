import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordUseCase } from '../../../domain/use-cases/reset-password.use-case';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconEye, IconEyeOff, IconLayoutDashboard } from 'angular-tabler-icons/icons';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, RouterTestingModule],
      providers: [
        { provide: ResetPasswordUseCase, useValue: { execute: () => of(void 0) } },
        provideTablerIcons({ IconEye, IconEyeOff, IconLayoutDashboard }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
