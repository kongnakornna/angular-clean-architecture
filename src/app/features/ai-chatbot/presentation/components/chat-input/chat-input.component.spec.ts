import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatInputComponent } from './chat-input.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ChatInputComponent', () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputComponent, TranslateModule.forRoot()]
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
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.disabled).toBeTrue();
  });

  it('should disable send button when input is empty', () => {
    component.input = '';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should disable send button when loading is true', () => {
    component.input = 'Hello';
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
