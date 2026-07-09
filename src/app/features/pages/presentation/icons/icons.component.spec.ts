import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTablerIcons } from 'angular-tabler-icons';
import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent],
      providers: [provideTablerIcons({})],
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});