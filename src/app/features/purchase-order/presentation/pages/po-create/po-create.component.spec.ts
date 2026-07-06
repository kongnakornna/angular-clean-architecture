import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { POCreateComponent } from './po-create.component';

describe('POCreateComponent', () => {
  let component: POCreateComponent;
  let fixture: ComponentFixture<POCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POCreateComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(POCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
