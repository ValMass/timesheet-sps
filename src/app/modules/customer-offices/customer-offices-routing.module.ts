import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOfficesComponent } from './customer-offices.component';

const routes: Routes = [{ path: '', component: CustomerOfficesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerOfficesRoutingModule { }
