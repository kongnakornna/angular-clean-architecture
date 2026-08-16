import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeIllustrationComponent } from './welcome-illustration.component';

describe('WelcomeIllustrationComponent', () => {
  let component: WelcomeIllustrationComponent;
  let fixture: ComponentFixture<WelcomeIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeIllustrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the illustration svg', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
