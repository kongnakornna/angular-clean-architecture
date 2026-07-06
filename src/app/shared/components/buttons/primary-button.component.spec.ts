import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryButtonComponent } from './primary-button.component';

describe('PrimaryButtonComponent', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick when clicked', () => {
    spyOn(component.onClick, 'emit');
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should not emit when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    spyOn(component.onClick, 'emit');
    const btn = fixture.nativeElement.querySelector('button');
    btn.click();
    expect(component.onClick.emit).not.toHaveBeenCalled();
  });
});
