import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentDetailComponent } from './payment-detail.component';

describe('PaymentDetailComponent', () => {
  let component: PaymentDetailComponent;
  let fixture: ComponentFixture<PaymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
