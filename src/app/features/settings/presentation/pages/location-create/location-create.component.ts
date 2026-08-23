import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLocationUseCase } from '../../../domain/use-cases/create-location.use-case';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-location-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './location-create.component.html',
})
export class LocationCreateComponent {
  name = '';
  typeName = '';
  emailId = '';
  bucket = '';
  org = '';
  deviceCount = 0;
  status = true;

  constructor(
    private createUseCase: CreateLocationUseCase,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.createUseCase.execute({
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
