import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-two-step-verification',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './two-step-verification.component.html',
  styleUrls: ['./two-step-verification.component.scss'],
})
export class TwoStepVerificationComponent {
  phoneNumber = '';
  countryCode = '+1';
  loading = false;

  countries = [
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'TH', name: 'Thailand', dial: '+66' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'JP', name: 'Japan', dial: '+81' },
    { code: 'KR', name: 'South Korea', dial: '+82' },
    { code: 'CN', name: 'China', dial: '+86' },
    { code: 'DE', name: 'Germany', dial: '+49' },
    { code: 'FR', name: 'France', dial: '+33' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'SG', name: 'Singapore', dial: '+65' },
  ];

  onSubmit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
