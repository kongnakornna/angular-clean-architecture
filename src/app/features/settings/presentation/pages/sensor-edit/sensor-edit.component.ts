import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListSensorsUseCase } from '../../../domain/use-cases/list-sensors.use-case';
import { UpdateSensorUseCase } from '../../../domain/use-cases/update-sensor.use-case';
import { Sensor } from '../../../domain/entities/sensor.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-sensor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './sensor-edit.component.html',
})
export class SensorEditComponent implements OnInit {
  id = '';
  name = '';
  type = '';
  unit = '';
  minThreshold = 0;
  maxThreshold = 100;
  status = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listUseCase: ListSensorsUseCase,
    private updateUseCase: UpdateSensorUseCase,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadItem();
  }

  loadItem(): void {
    this.listUseCase.execute({ search: this.id }).subscribe({
      next: (res) => {
        const item = res.data.find((s: Sensor) => s.id === this.id);
        if (item) {
          this.name = item.name;
          this.type = item.type;
          this.unit = item.unit;
          this.minThreshold = item.minThreshold;
          this.maxThreshold = item.maxThreshold;
          this.status = item.status;
        }
      },
    });
  }

  onSubmit(): void {
    this.updateUseCase.execute(this.id, {
      name: this.name,
      type: this.type,
      unit: this.unit,
      minThreshold: this.minThreshold,
      maxThreshold: this.maxThreshold,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/sensor']),
    });
  }
}
