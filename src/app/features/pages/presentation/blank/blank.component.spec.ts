import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTablerIcons } from 'angular-tabler-icons';
import { BlankComponent } from './blank.component';

describe('BlankComponent', () => {
  let component: BlankComponent;
  let fixture: ComponentFixture<BlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankComponent],
      providers: [provideTablerIcons({})],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});