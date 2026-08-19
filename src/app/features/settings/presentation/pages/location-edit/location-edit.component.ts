import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListLocationsUseCase } from '../../../domain/use-cases/list-locations.use-case';
import { UpdateLocationUseCase } from '../../../domain/use-cases/update-location.use-case';
import { Location } from '../../../domain/entities/location.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-location-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './location-edit.component.html',
})
export class LocationEditComponent implements OnInit {
  id = '';
  name = '';
  typeName = '';
  emailId = '';
  bucket = '';
  org = '';
  deviceCount = 0;
  status = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listUseCase: ListLocationsUseCase,
    private updateUseCase: UpdateLocationUseCase,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadItem();
  }

  loadItem(): void {
    this.listUseCase.execute({ search: this.id }).subscribe({
      next: (res) => {
        const item = res.data.find((l: Location) => l.id === this.id);
        if (item) {
          this.name = item.name;
          this.typeName = item.typeName;
          this.emailId = item.emailId;
          this.bucket = item.bucket;
          this.org = item.org;
          this.deviceCount = item.deviceCount;
          this.status = item.status;
        }
      },
    });
  }

  onSubmit(): void {
    this.updateUseCase.execute(this.id, {
      name: this.name,
      typeName: this.typeName,
      emailId: this.emailId,
      bucket: this.bucket,
      org: this.org,
      deviceCount: this.deviceCount,
      status: this.status,
    }).subscribe({
      next: () => this.router.navigate(['/settings/location']),
    });
  }
}
