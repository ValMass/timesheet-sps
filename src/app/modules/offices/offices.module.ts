import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficesComponent } from './offices.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
import { OfficeListComponent } from './office-list.component';
import { SharedModule } from '../../shared/shared.module';

import { AddOfficeDialogComponent } from './modals/add-office-dialog/add-office-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfficesComponent,
    OfficeDetailComponent,
    AddOfficeDialogComponent,
    OfficeListComponent,
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  entryComponents: [
    AddOfficeDialogComponent
  ]
})
export class OfficesModule { }
