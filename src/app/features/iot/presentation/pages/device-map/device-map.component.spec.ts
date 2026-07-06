import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceMapComponent } from './device-map.component';

describe('DeviceMapComponent', () => {
  let component: DeviceMapComponent;
  let fixture: ComponentFixture<DeviceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMapComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
