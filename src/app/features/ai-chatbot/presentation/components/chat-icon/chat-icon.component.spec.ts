import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatIconComponent } from './chat-icon.component';

describe('ChatIconComponent', () => {
  let component: ChatIconComponent;
  let fixture: ComponentFixture<ChatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event on click', () => {
    spyOn(component.toggle, 'emit');
    const button = fixture.nativeElement.querySelector('.chat-fab');
    button.click();
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should apply active class when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.chat-fab');
    expect(button.classList.contains('chat-fab-active')).toBeTrue();
  });

  it('should not apply active class when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.chat-fab');
    expect(button.classList.contains('chat-fab-active')).toBeFalse();
  });
});
