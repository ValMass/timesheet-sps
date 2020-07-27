import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractComponent } from './contract.component';
import { ContractResolverService } from './service/contract-resolver.service';

const routes: Routes = [{ path: '',
  component: ContractComponent,
  resolve: { customerofficelist: ContractResolverService }, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
