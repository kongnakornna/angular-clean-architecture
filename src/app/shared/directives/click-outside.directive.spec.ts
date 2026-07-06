import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  standalone: false,
  template: `<div clickOutside (clickOutside)="onClickOutside()" id="test"></div>`,
})
class TestComponent {
  clicked = false;
  onClickOutside() { this.clicked = true; }
}

@NgModule({
  declarations: [TestComponent, ClickOutsideDirective],
})
class TestModule {}

describe('ClickOutsideDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('#test'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit when clicking inside', () => {
    divEl.nativeElement.click();
    expect(component.clicked).toBeFalse();
  });

  it('should emit when clicking outside', () => {
    document.body.click();
    expect(component.clicked).toBeTrue();
  });
});
