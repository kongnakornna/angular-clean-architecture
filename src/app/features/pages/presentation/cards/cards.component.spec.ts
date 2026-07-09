import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTablerIcons } from 'angular-tabler-icons';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent],
      providers: [provideTablerIcons({})],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});