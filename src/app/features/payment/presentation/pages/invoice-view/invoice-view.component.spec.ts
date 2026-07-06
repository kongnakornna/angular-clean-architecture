import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InvoiceViewComponent } from './invoice-view.component';

describe('InvoiceViewComponent', () => {
  let component: InvoiceViewComponent;
  let fixture: ComponentFixture<InvoiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceViewComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
