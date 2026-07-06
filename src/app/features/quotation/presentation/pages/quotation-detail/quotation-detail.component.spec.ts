import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuotationDetailComponent } from './quotation-detail.component';

describe('QuotationDetailComponent', () => {
  let component: QuotationDetailComponent;
  let fixture: ComponentFixture<QuotationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationDetailComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
