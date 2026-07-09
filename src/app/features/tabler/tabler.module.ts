import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TABLER_ROUTES } from './tabler-routing.module';

@NgModule({
  imports: [
    RouterModule.forChild(TABLER_ROUTES),
  ],
})
export class TablerModule { }
