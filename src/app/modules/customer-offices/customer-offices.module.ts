import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerOfficesRoutingModule } from './customer-offices-routing.module';
import { CustomerOfficesComponent } from './customer-offices.component';


@NgModule({
  declarations: [CustomerOfficesComponent],
  imports: [
    CommonModule,
    CustomerOfficesRoutingModule
  ]
})
export class CustomerOfficesModule { }
