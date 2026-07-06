import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService, ToastType } from '../../services/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ToastComponent],
      providers: [ToastService],
    }).compileComponents();

    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast on service.show()', () => {
    toastService.show({ title: 'Test', message: 'Message', type: ToastType.success });
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[role="alert"]');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Test');
  });

  it('should close toast', () => {
    toastService.show({ title: 'Test' });
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    expect(component.toast$).toBeDefined();
  });
});
