import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import { ContractListComponent } from './contract-list.component';
// import { CardContentComponent } from './card-content.component';
 import { ContractDetailComponent } from './contract-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { AddContractDialogComponent } from './add-contract-dialog/add-contract-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule, ContractsComponent],
  declarations: [ContractsComponent, ContractListComponent,ContractDetailComponent, AddContractDialogComponent]
})
export class ContractsModule {}
