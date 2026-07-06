import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { POListComponent } from './po-list.component';

describe('POListComponent', () => {
  let component: POListComponent;
  let fixture: ComponentFixture<POListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POListComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(POListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
