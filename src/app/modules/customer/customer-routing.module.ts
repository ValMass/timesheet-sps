import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerOfficesDetailComponent } from './customer-offices-detail/customer-offices-detail.component';
import { ConsumerOfficesResolverService } from './services/consumer-offices-resolver.service';
import { CustomerService } from './services/customer.service';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    resolve: {
      customerList: CustomerService
    }
  },
  {
    path: 'customer/:id',
    component: CustomerOfficesDetailComponent,
    resolve: {
      customer: ConsumerOfficesResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
