import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onConfirm', () => {
    spyOn(component.onConfirm, 'emit');
    component.onConfirm.emit();
    expect(component.onConfirm.emit).toHaveBeenCalled();
  });

  it('should emit onCancel', () => {
    spyOn(component.onCancel, 'emit');
    component.onCancel.emit();
    expect(component.onCancel.emit).toHaveBeenCalled();
  });
});
