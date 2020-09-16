import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistancesRoutingModule } from './distances-routing.module';
import { DistancesComponent } from './distances.component';


@NgModule({
  declarations: [DistancesComponent],
  imports: [
    CommonModule,
    DistancesRoutingModule
  ]
})
export class DistancesModule { }
