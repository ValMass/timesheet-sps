import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { SideBarComponent } from '@app/component/side-bar/side-bar.component';
import { AddContractDialogComponent } from './modal/add-contract-dialog/add-contract-dialog.component';
import { MatDialogModule } from '@angular/material/dialog/dialog-module';
import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { MatDatepickerModule } from '@angular/material/datepicker/datepicker-module';
import { MatNativeDateModule } from '@angular/material/core/datetime';
import { MatIconModule } from '@angular/material/icon/icon-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContractComponent,
    AddContractDialogComponent,
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddContractDialogComponent
  ]
})
export class ContractModule { }
