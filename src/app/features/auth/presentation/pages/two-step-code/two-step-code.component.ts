import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-two-step-code',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './two-step-code.component.html',
})
export class TwoStepCodeComponent implements AfterViewInit {
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef<HTMLInputElement>>;

  codes: string[] = ['', '', '', '', '', ''];
  loading = false;
  dontAskAgain = false;

  ngAfterViewInit(): void {
    this.codeInputs.changes.subscribe(() => this.setupCodeInputs());
    this.setupCodeInputs();
  }

  private setupCodeInputs(): void {
    const inputs = this.codeInputs.toArray();
    inputs.forEach((input, i) => {
      const el = input.nativeElement;
      el.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length >= 1 && i < inputs.length - 1) {
          inputs[i + 1].nativeElement.focus();
        }
      });
      el.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && !el.value && i > 0) {
          inputs[i - 1].nativeElement.focus();
        }
      });
    });
  }

  onSubmit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
