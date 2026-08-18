import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolExecutionCardComponent } from './tool-execution-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToolCall, ToolResult } from '../../../domain/entities/chat-message.entity';

describe('ToolExecutionCardComponent', () => {
  let component: ToolExecutionCardComponent;
  let fixture: ComponentFixture<ToolExecutionCardComponent>;

  const mockToolCall: ToolCall = {
    id: 'tool-1',
    name: 'create_job',
    arguments: { title: 'Test Job', customerId: '123' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolExecutionCardComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolExecutionCardComponent);
    component = fixture.componentInstance;
    component.toolCall = mockToolCall;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tool label', () => {
    const label = component.getToolLabel('create_job');
    expect(label).toBe('aiChat.toolCreateJob');
  });

  it('should return raw name for unknown tool', () => {
    const label = component.getToolLabel('unknown_tool');
    expect(label).toBe('unknown_tool');
  });

  it('should emit confirm event with toolCall id', () => {
    spyOn(component.confirm, 'emit');
    const confirmBtn = fixture.nativeElement.querySelector('.btn-success');
    confirmBtn.click();
    expect(component.confirm.emit).toHaveBeenCalledWith('tool-1');
  });

  it('should emit reject event with toolCall id', () => {
    spyOn(component.reject, 'emit');
    const rejectBtn = fixture.nativeElement.querySelector('.btn-outline-danger');
    rejectBtn.click();
    expect(component.reject.emit).toHaveBeenCalledWith('tool-1');
  });

  it('should hide action buttons when result exists', () => {
    component.result = { toolCallId: 'tool-1', content: 'success', success: true };
    fixture.detectChanges();
    const actions = fixture.nativeElement.querySelector('.tool-card-actions');
    expect(actions).toBeNull();
  });

  it('should show success message when result is success', () => {
    component.result = { toolCallId: 'tool-1', content: 'success', success: true };
    fixture.detectChanges();
    const resultEl = fixture.nativeElement.querySelector('.text-success');
    expect(resultEl).toBeTruthy();
  });

  it('should show error message when result is failure', () => {
    component.result = { toolCallId: 'tool-1', content: 'Failed to create', success: false };
    fixture.detectChanges();
    const resultEl = fixture.nativeElement.querySelector('.text-danger');
    expect(resultEl).toBeTruthy();
  });
});
