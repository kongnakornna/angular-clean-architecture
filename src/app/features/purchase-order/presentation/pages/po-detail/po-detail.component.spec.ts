import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PODetailComponent } from './po-detail.component';

describe('PODetailComponent', () => {
  let component: PODetailComponent;
  let fixture: ComponentFixture<PODetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PODetailComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PODetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
