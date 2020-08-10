import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list.component';
import { CardContentComponent } from './card-content.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { AcDialogComponent } from './ac-dialog/ac-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule, CustomersComponent],
  declarations: [CustomersComponent, CustomerListComponent, CustomerDetailComponent, CardContentComponent,AcDialogComponent]
})
export class CustomersModule { }
