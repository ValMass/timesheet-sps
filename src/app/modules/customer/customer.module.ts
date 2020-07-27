import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerOfficesDetailComponent } from './customer-offices-detail/customer-offices-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog/dialog-module';
import { AddCustomerDialogComponent } from './modal/add-customer-dialog/add-customer-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerComponent, CustomerOfficesDetailComponent, AddCustomerDialogComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AddCustomerDialogComponent
  ]
})
export class CustomerModule { }
