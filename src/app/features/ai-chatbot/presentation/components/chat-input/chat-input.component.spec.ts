import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatInputComponent } from './chat-input.component';
import { I18nService } from '../../../../../shared/i18n/data/i18n.service';

describe('ChatInputComponent', () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputComponent],
      providers: [
        { provide: I18nService, useValue: { translate: (k: string) => k } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit send event with trimmed input', () => {
    spyOn(component.send, 'emit');
    component.input = '  Hello World  ';
    component.onSend();
    expect(component.send.emit).toHaveBeenCalledWith('Hello World');
    expect(component.input).toBe('');
  });

  it('should not emit send event for empty input', () => {
    spyOn(component.send, 'emit');
    component.input = '   ';
    component.onSend();
    expect(component.send.emit).not.toHaveBeenCalled();
  });

  it('should disable textarea when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(component.loading).toBeTrue();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should disable send button when input is empty', () => {
    component.input = '';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should disable send button when loading is true', () => {
    component.input = 'Hello';
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
