import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListHardwareUseCase } from '../../../domain/use-cases/list-hardware.use-case';
import { UpdateHardwareUseCase } from '../../../domain/use-cases/update-hardware.use-case';
import { Hardware } from '../../../domain/entities/hardware.entity';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hardware-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './hardware-edit.component.html',
})
export class HardwareEditComponent implements OnInit {
  id = '';
  title = '';
  typeName = '';
  description = '';
  price = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listUseCase: ListHardwareUseCase,
    private updateUseCase: UpdateHardwareUseCase,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadItem();
  }

  loadItem(): void {
    this.listUseCase.execute({ search: this.id }).subscribe({
      next: (res) => {
        const item = res.data.find((h: Hardware) => h.id === this.id);
        if (item) {
          this.title = item.title;
          this.typeName = item.typeName;
          this.description = item.description;
          this.price = item.price;
        }
      },
    });
  }

  onSubmit(): void {
    this.updateUseCase.execute(this.id, {
      title: this.title,
      typeName: this.typeName,
      description: this.description,
      price: this.price,
    }).subscribe({
      next: () => this.router.navigate(['/settings/hardware']),
    });
  }
}
